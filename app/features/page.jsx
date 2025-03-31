"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Video, Music, Zap, Github, Linkedin, ArrowRight } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Nav from "@/components/ui/Nav";

function Features() {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

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
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden flex flex-col items-center px-4 pt-24 pb-16"
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

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-10 filter blur-[80px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600 rounded-full opacity-10 filter blur-[80px]"></div>

      {/* Under Development Banner */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center py-2 font-semibold text-lg">
        Still Under Development
      </div>

      <div className="relative flex items-center justify-center mb-6 md:mb-8 mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            Discover AUVI’s Magic
          </span>
        </h1>
        <Sparkles className="absolute -top-4 -right-4 h-8 w-8 md:h-10 md:w-10 text-yellow-400 animate-pulse" />
      </div>

      <p className="text-lg sm:text-xl md:text-2xl text-center max-w-3xl px-4 text-gray-300 mb-12 leading-relaxed">
        Unleash your creativity with AUVI! Craft mesmerizing short AI-generated videos, crystal-clear audio, and more—all powered by cutting-edge artificial intelligence. Your ideas, brought to life in moments.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl px-4 w-full">
        <FeatureCard
          icon={<Video className="h-10 w-10 text-pink-400" />}
          title="Short AI Videos"
          description="Create captivating short videos with AI, tailored to your vision, in just a few clicks."
        />
        <FeatureCard
          icon={<Music className="h-10 w-10 text-purple-400" />}
          title="AI Audio Magic"
          description="Generate studio-quality audio tracks effortlessly, perfect for any project."
        />
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-orange-400" />}
          title="Instant Results"
          description="Turn your ideas into reality at lightning speed with AUVI’s powerful AI tools."
        />
      </div>

      <Link href="/dashboard">
        <Button className="mt-12 group bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg shadow-purple-500/20 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative flex items-center text-lg">
            Start Creating Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </span>
        </Button>
      </Link>

      <footer className="mt-16 text-gray-400 text-center">
        <p className="text-sm">
          Made with ❤️ by Aditya Shukla
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://www.linkedin.com/in/adityashukla190503/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/adityasays" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative">
        <div className="mb-4 transition-transform duration-300 group-hover:translate-y-1">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <Features />
    </>
  );
}

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