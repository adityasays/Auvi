"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Mail, User, MessageSquare, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Nav from "../Nav";

function Contact() {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        alert("Message sent successfully! ");
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center py-2 font-semibold text-lg">
        Still Under Development
      </div>

      <div className="relative flex items-center justify-center mb-6 md:mb-8 mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            Get in Touch
          </span>
        </h1>
        <Sparkles className="absolute -top-4 -right-4 h-8 w-8 md:h-10 md:w-10 text-yellow-400 animate-pulse" />
      </div>

      <p className="text-lg sm:text-xl md:text-2xl text-center max-w-3xl px-4 text-gray-300 mb-12 leading-relaxed">
        Have questions or ideas? Reach out to us! We’d love to hear from you and help bring your vision to life.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg shadow-purple-500/10"
      >
        <div className="mb-6">
          <label htmlFor="name" className="flex items-center text-gray-300 mb-2">
            <User className="h-5 w-5 mr-2" /> Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-all duration-300"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="flex items-center text-gray-300 mb-2">
            <Mail className="h-5 w-5 mr-2" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-all duration-300"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="flex items-center text-gray-300 mb-2">
            <MessageSquare className="h-5 w-5 mr-2" /> Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-all duration-300 h-32 resize-none"
            placeholder="Your Message"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full group bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg shadow-purple-500/20 flex items-center justify-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative flex items-center text-lg">
            {isSubmitting ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-5 w-5" />
          </span>
        </Button>
      </form>

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-center">
        <p className="text-sm">Made with ❤️ by Aditya Shukla</p>
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

export default function ContactPage() {
  return (
    <>
      <Nav />
      <Contact />
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