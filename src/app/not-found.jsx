// Use client is optional, but good if you add interactivity later
import MainLayout from "./layouts/MainLayout";

export const metadata = {
  title: "Page Not Found - High Creation Interior",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div>
      <MainLayout>
        <main>
         <section className="text-center">
           {/* Link wrapper to go home if image is clicked */}
           <a href="/">
             <img 
                src="/images/four.png" 
                className="w-100 object-fit-cover" 
                height={500} 
                alt="404 Page Not Found" 
                style={{ maxHeight: '80vh', objectFit: 'contain' }}
             />
           </a>
           <div className="my-4">
             <h3>Page Not Found</h3>
             <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
             <a href="/" className="btn know_more">Go Back Home</a>
           </div>
         </section>
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
}