'use client'
import React, { useRef, useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Page() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        spotlightRef.current.style.background = `
          radial-gradient(circle at ${x}% ${y}%, rgba(111, 76, 255, 0.3) 0%, rgba(0, 0, 0, 0) 25%),
          radial-gradient(circle at ${x}% ${y}%, rgba(56, 189, 248, 0.2) 0%, rgba(0, 0, 0, 0) 35%),
          radial-gradient(circle at ${x}% ${y}%, rgba(236, 72, 153, 0.15) 0%, rgba(0, 0, 0, 0) 45%)
        `;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out"
        }
      );
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-black to-gray-900" />
      
      <div 
        ref={spotlightRef} 
        className="fixed inset-0 pointer-events-none"
      />
      
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-md p-6 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
        }}
      >
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl" />
        
        <div className="transition-all duration-300 hover:scale-[1.01]">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]",
                card: "backdrop-filter-none shadow-none",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-300",
                formFieldLabel: "text-gray-300",
                formFieldInput: "bg-gray-800 border-gray-700 text-white",
                footerActionText: "text-gray-400",
                footerActionLink: "text-indigo-400 hover:text-indigo-300"
              }
            }}
          />
        </div>
      </div>
      
      
    </div>
  );
}