'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Play, Volume2 } from 'lucide-react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-md' : 'bg-gradient-to-r from-gray-900 to-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className='flex justify-between p-3 px-6 items-center'>
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gradient-to-br from-indigo-800 to-violet-900 flex items-center justify-center shadow-lg">
              <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
              <Volume2 className="text-white/90 h-5 w-5 absolute" style={{ left: '8px', top: '8px' }} />
              <Play className="text-white/90 h-4 w-4 absolute" style={{ right: '8px', bottom: '8px' }} />
            </div>
            
            <div className="flex flex-col">
              <h1 className='font-bold text-3xl text-white'>
                AUVI
              </h1>
              <span className="text-xs text-gray-400 font-medium tracking-wider -mt-1">
                AI VIDEO CREATOR
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Examples</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Pricing</a>
          </nav>
          
          <div className="flex items-center gap-3"> 
            <Button className="bg-indigo-900 hover:bg-indigo-800 rounded-md px-4 py-1 h-9 text-sm">
              Dashboard
            </Button> 
            <div className="bg-gray-800 p-1 rounded-md">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;