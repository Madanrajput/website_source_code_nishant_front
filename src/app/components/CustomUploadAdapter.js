import imageCompression from 'browser-image-compression';
import api from '@/utils/api';

const uploadedImageAltRegistry = new Map();

const API_BASE_URL =
    (process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL) || 'https://apidev.hcinterior.in';

const normalizeMediaUrl = (url = '') => {
    if (!url) return '';
    if (url.startsWith('http://')) return url.replace('http://', 'https://');
    return url;
};

const rememberUploadedImageAlt = (url, altText) => {
    const trimmedAltText = altText?.trim();
    const normalizedUrl = normalizeMediaUrl(url);
    if (!normalizedUrl || !trimmedAltText) return;
    uploadedImageAltRegistry.set(normalizedUrl, trimmedAltText);
};

export const getUploadedImageAlt = (url) => uploadedImageAltRegistry.get(normalizeMediaUrl(url));

// 🌟 MODERN ASYNC PROMPT UI (Replaces the buggy window.prompt)
let isPromptActive = false;
const promptQueue = [];

const processPromptQueue = () => {
    if (isPromptActive || promptQueue.length === 0) return;
    isPromptActive = true;

    const { resolve, defaultText } = promptQueue.shift();

    // Create Background Overlay
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)', zIndex: '999999', display: 'flex',
        alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
        fontFamily: 'var(--font-outfit), var(--font-poppins), sans-serif'
    });

    // Create Modal Box
    const box = document.createElement('div');
    Object.assign(box.style, {
        backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px',
        width: '450px', maxWidth: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s ease-out'
    });

    const title = document.createElement('h3');
    title.innerHTML = '🖼️ SEO Alt Text Required';
    Object.assign(title.style, { margin: '0 0 12px 0', fontSize: '1.4rem', color: '#111', fontWeight: '700' });

    const desc = document.createElement('p');
    desc.innerText = 'To improve SEO and accessibility, please provide a short, descriptive text for this image.';
    Object.assign(desc.style, { margin: '0 0 20px 0', fontSize: '0.95rem', color: '#555', lineHeight: '1.5' });

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'e.g., A minimalist white living room setup';
    input.value = defaultText || '';
    Object.assign(input.style, {
        width: '100%', padding: '14px 16px', borderRadius: '8px', border: '2px solid #e2e8f0',
        marginBottom: '24px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    });
    input.onfocus = () => input.style.borderColor = '#ff914d';
    input.onblur = () => input.style.borderColor = '#e2e8f0';

    // Bottom Action Row
    const btnWrapper = document.createElement('div');
    Object.assign(btnWrapper.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center' });

    const errorMsg = document.createElement('span');
    errorMsg.innerText = '* Alt text is required';
    Object.assign(errorMsg.style, { color: '#e74c3c', fontSize: '0.85rem', opacity: '0', transition: 'opacity 0.2s', fontWeight: '600' });

    const saveBtn = document.createElement('button');
    saveBtn.innerText = 'Save & Continue';
    Object.assign(saveBtn.style, {
        backgroundColor: '#ff914d', color: '#fff', border: 'none', padding: '12px 28px',
        borderRadius: '50px', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem',
        transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(255, 145, 77, 0.3)'
    });
    saveBtn.onmouseover = () => { saveBtn.style.backgroundColor = '#e67d3c'; saveBtn.style.transform = 'translateY(-1px)'; };
    saveBtn.onmouseout = () => { saveBtn.style.backgroundColor = '#ff914d'; saveBtn.style.transform = 'translateY(0)'; };

    btnWrapper.append(errorMsg, saveBtn);
    box.append(title, desc, input, btnWrapper);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Auto focus the input after it mounts
    setTimeout(() => input.focus(), 50);

    const handleSave = () => {
        const val = input.value.trim();
        if (!val) {
            errorMsg.style.opacity = '1';
            input.style.borderColor = '#e74c3c';
            box.animate([
                { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' },
                { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400, easing: 'ease-in-out' });
        } else {
            document.body.removeChild(overlay);
            isPromptActive = false;
            resolve(val);
            processPromptQueue(); 
        }
    };

    saveBtn.onclick = handleSave;
    input.onkeydown = (e) => { if (e.key === 'Enter') handleSave(); };
};

export const requireAltTextPrompt = (defaultText = '') => {
    return new Promise((resolve) => {
        promptQueue.push({ resolve, defaultText });
        processPromptQueue();
    });
};

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        try {
            const file = await this.loader.file;
            
            // 🌟 Use the sleek React-style async popup instead of window.prompt
            const altText = await requireAltTextPrompt();

            // 🌟 YOUR LIVE LOGIC PRESERVED EXACTLY 🌟
            // Step 1: Compress image and convert to WebP for faster loading
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                fileType: 'image/webp',
            };
            const compressedFile = await imageCompression(file, options);

            // Step 2: Prepare FormData
            const formData = new FormData();
            formData.append('image', compressedFile, 'upload.webp');
            formData.append('alt_text', altText); // using the captured altText from new UI

            // Step 3: Upload to backend
            const response = await api.post('/cms-parent-child/upload-image', formData);
            
            // Axios automatically parses the JSON into the `.data` property
            const result = response.data;

            // Step 4: Ensure HTTPS URL
            const imageUrl = normalizeMediaUrl(result.url || '');
            rememberUploadedImageAlt(imageUrl, result.alt_text || altText);

            // Return the URL to CKEditor so it can display the image
            return {
                default: imageUrl,
            };

        } catch (error) {
            console.error("Upload Adapter Error:", error);
            // Reject the promise so CKEditor knows the upload failed
            return Promise.reject(error?.message || "Failed to upload image");
        }
    }

    abort() {
        // This stops the upload if the user deletes the image before it finishes uploading
        console.log("Image upload aborted by user.");
    }
}

// CKEditor plugin initialization
export default function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}