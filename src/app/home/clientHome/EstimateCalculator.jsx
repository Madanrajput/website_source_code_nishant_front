"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaBuilding, FaHome } from "react-icons/fa";

export default function EstimateCalculator({ cmsData }) {
    const router = useRouter();
    const [selected, setSelected] = useState('3bhk');

    const options = [
        // { id: '1bhk', label: '1 BHK', icon: <FaBuilding size={24} className="mb-2" />, home: 'apartment', bhk: '1bhk' },
        { id: '2bhk', label: '2 BHK', icon: <FaBuilding size={24} className="mb-2" />, home: 'apartment', bhk: '2bhk' },
        { id: '3bhk', label: '3 BHK', icon: <FaBuilding size={24} className="mb-2" />, home: 'apartment', bhk: '3bhk' },
        { id: '4bhk', label: '4 BHK', icon: <FaBuilding size={24} className="mb-2" />, home: 'apartment', bhk: '4bhk' },
        { id: 'villa', label: 'Villa', icon: <FaHome size={24} className="mb-2" />, home: 'villa', bhk: '3bhk' }
    ];

    const handleCalculate = () => {
        const config = options.find(opt => opt.id === selected);
        if(config) router.push(`/estimator-for-home?home=${config.home}&bhk=${config.bhk}`);
    };

    // 🌟 DYNAMIC 3D CUBE MATH 
    const rotatingWords = cmsData?.rotating_words ? cmsData.rotating_words.split(',').map(w => w.trim()) : ["2BHK", "3BHK", "4BHK", "Villa"];
    const numWords = rotatingWords.length;
    
    // Calculate the perfect 3D polygon radius (translateZ) based on a 50px high face
    // e.g., 4 words = 90deg, translateZ = 25px. 3 words = 120deg, translateZ = 14px.
    const angle = 360 / numWords;
    const tz = Math.round(25 / Math.tan(Math.PI / numWords)); 
    const duration = numWords * 2.5; // 2.5 seconds per word

    // Dynamically generate the perfect CSS Keyframes for ANY amount of words
    let keyframes = '';
    const stepPct = 100 / numWords; 
    const pausePct = stepPct * 0.8; // Hold the word for 80% of its timeslot
    
    for (let i = 0; i < numWords; i++) {
        const start = i * stepPct;
        const end = start + pausePct;
        const currentAngle = -(i * angle);
        keyframes += `${start}%, ${end}% { transform: translateZ(-${tz}px) rotateX(${currentAngle}deg); }\n`;
    }
    // Complete the 360 rotation to loop smoothly
    keyframes += `100% { transform: translateZ(-${tz}px) rotateX(-360deg); }`;

    return (
        <div className="container text-center mb-5 position-relative z-index-1">
            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes spinDynamicCube {
                    ${keyframes}
                }
                .cube-container {
                    display: inline-block;
                    height: 50px;
                    width: 220px;
                    perspective: 1000px;
                    vertical-align: bottom;
                }
                .cube-spinner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    animation: spinDynamicCube ${duration}s infinite cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .cube-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: #ff914d;
                    font-weight: bold;
                    font-size: clamp(1.5rem, 3vw, 2.2rem);
                    line-height: 50px;
                    backface-visibility: hidden;
                    white-space: nowrap;
                }
                @media (max-width: 768px) {
                    .cube-container { width: 100%; display: block; margin-top: 5px; }
                    .cube-face { justify-content: center; font-size: 1.8rem; }
                }
            `}} />

            <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mx-auto" style={{ maxWidth: '850px', border: '1px solid #ffeeee' }}>
                
                {/* 🌟 THE RESTORED FLAWLESS 3D ANIMATION */}
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mb-3">
                    <h2 className="font_about text-dark mb-0" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: "50px" }}>
                        {cmsData?.heading || "Calculate the cost of your"}
                    </h2>
                    
                    <div className="cube-container">
                        <div className="cube-spinner">
                            {rotatingWords.map((word, index) => {
                                const rotateX = index * angle;
                                return (
                                    <div 
                                        key={index} 
                                        className="cube-face" 
                                        style={{ transform: `rotateX(${rotateX}deg) translateZ(${tz}px)` }}
                                    >
                                        {word}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                
                <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "600px" }}>
                    {cmsData?.description || "Select your floor plan to get a personalized, transparent estimate in seconds."}
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3 mb-4 pb-2">
                    {options.map((opt) => {
                        const isSelected = selected === opt.id;
                        return (
                            <div 
                                key={opt.id}
                                onClick={() => setSelected(opt.id)}
                                className="d-flex flex-column align-items-center justify-content-center rounded-3 p-3 transition-all"
                                style={{
                                    width: '100px', height: '100px', cursor: 'pointer',
                                    border: isSelected ? '2px solid #ff914d' : '1px solid #e2e8f0',
                                    backgroundColor: isSelected ? '#fff4ed' : '#ffffff',
                                    color: isSelected ? '#ff914d' : '#64748b',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {opt.icon}
                                <span className="fw-bold" style={{ fontSize: '14px' }}>{opt.label}</span>
                            </div>
                        );
                    })}
                </div>

                <button onClick={handleCalculate} className="btn text-white fw-bold px-5 py-3 rounded-pill shadow-sm" style={{ backgroundColor: "#ff914d", fontSize: "1.1rem", transition: "all 0.3s ease" }}>
                    {cmsData?.button_text || "Get Free Estimate"} <MdKeyboardArrowRight size={24} className="ms-1" />
                </button>
            </div>
        </div>
    );
}