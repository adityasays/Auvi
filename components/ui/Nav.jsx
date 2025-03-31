"use client";
import React, { useState, useEffect } from "react";
import { Video, Mail, Menu, X, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                AUVI
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink icon={<Video />} text="Dashboard" href="/dashboard" />
              <NavLink icon={<Mail />} text="Contact" href="/contact" />
              <UserButton />
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-lg bg-black/70">
          <MobileNavLink icon={<Video />} text="Dashboard" href="/dashboard" />
          <MobileNavLink icon={<Mail />} text="Contact" href="/contact" />
          <div className="mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
        active ? "text-white bg-purple-600/20" : "text-gray-300 hover:text-white hover:bg-purple-600/10"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          active ? "text-purple-400" : "text-gray-400 group-hover:text-purple-400"
        }`}
      >
        {icon}
      </div>
      <span className="ml-2">{text}</span>
      {active && <span className="ml-1.5 flex h-1.5 w-1.5 rounded-full bg-purple-400"></span>}
    </Link>
  );
}

function MobileNavLink({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-3 text-base font-medium rounded-md ${
        active ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      <div className={`mr-3 ${active ? "text-purple-400" : "text-gray-400"}`}>{icon}</div>
      {text}
    </Link>
  );
}

export default Nav;