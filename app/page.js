"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Music, Video, Zap, ArrowRight, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Nav from "./Nav";
import { Button } from "@/components/ui/button";

function Hero() {
  const [particles, setParticles] = useState([]);
  const [showModal, setShowModal] = useState(true); 
  const containerRef = useRef(null);

  // Particle generation
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color:
          i % 4 === 0
            ? "#8b5cf6"
            : i % 4 === 1
            ? "#ec4899"
            : i % 4 === 2
            ? "#f97316"
            : "#3b82f6",
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    setParticles(newParticles);
  }, []);

  // Particle animation
  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;

    const animateParticles = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX * deltaTime * 0.1;
          let newY = particle.y + particle.speedY * deltaTime * 0.1;

          if (newX < -5) newX = 105;
          if (newX > 105) newX = -5;
          if (newY < -5) newY = 105;
          if (newY > 105) newY = -5;

          return { ...particle, x: newX, y: newY };
        })
      );

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animationFrameId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden flex flex-col items-center justify-center px-4 pt-24 pb-16"
      ref={containerRef}
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              filter: "blur(1px)",
              transition: "none",
            }}
          />
        ))}
      </div>

      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-10 filter blur-[80px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600 rounded-full opacity-10 filter blur-[80px]"></div>

      {/* Title */}
      <div className="relative flex items-center justify-center mb-6 md:mb-8">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            AU
          </span>
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            VI
          </span>
        </h1>
        <Sparkles className="absolute -top-6 -right-6 h-8 w-8 md:h-12 md:w-12 text-yellow-400 animate-pulse" />
      </div>

      {/* Subtitle */}
      <div className="mb-6 md:mb-8 text-xl md:text-2xl font-light tracking-widest text-gray-400">
        <p>AUdio and VIdeo Creation</p>
      </div>

      {/* Description */}
      <p className="text-lg sm:text-xl md:text-2xl text-center max-w-2xl px-4 text-gray-300 mb-8 md:mb-10 leading-relaxed">
        Transform your ideas into stunning audio and video content with the power of AI
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 z-10 w-full max-w-md sm:max-w-lg justify-center">
        <Link href="/dashboard">
          <Button className="group w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 hover:shadow-lg shadow-purple-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Go to Dashboard
            </span>
          </Button>
        </Link>
        <Link href="/features">
          <Button className="group w-full sm:w-auto bg-gray-800 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 hover:shadow-lg border border-purple-500/30 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center">
              <ArrowRight className="mr-2 h-5 w-5" />
              Explore Features
            </span>
          </Button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 max-w-5xl px-4 w-full">
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-orange-400" />}
          title="Instant Creation"
          description="Generate professional content in seconds with our AI engine"
        />
        <FeatureCard
          icon={<Music className="h-8 w-8 text-purple-400" />}
          title="Studio Quality"
          description="Produce audio that sounds like it was made in a professional studio"
        />
        <FeatureCard
          icon={<Video className="h-8 w-8 text-pink-400" />}
          title="Smart Editing"
          description="Edit videos with simple text commands - no technical skills needed"
        />
      </div>

      {/* UserButton */}
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-purple-500/50 shadow-lg shadow-purple-500/20 max-w-md w-full mx-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Notice
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We’ve encountered an issue with our image generation API. Our team is working diligently to resolve it. Thank you for your patience!
            </p>
            <Button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 rounded-lg hover:from-purple-700 hover:to-pink-700"
            >
              Got It
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative">
        <div className="mb-4 transition-transform duration-300 group-hover:translate-y-1">{icon}</div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
    </>
  );
}

// Inject CSS animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .animate-float { animation: float 6s ease-in-out infinite; }
  `;
  document.head.appendChild(style);
}