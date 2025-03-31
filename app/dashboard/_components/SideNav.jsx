// app/dashboard/components/SideNav.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, Home, Crown, UserCircle, Menu, X, BookOpen } from 'lucide-react';

function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Create New', icon: PlusCircle, path: '/dashboard/create-new' },
    { name: 'Upgrade', icon: Crown, path: '/dashboard/upgrade' },
    { name: 'Tutorial', icon: BookOpen, path: '/dashboard/tutorial' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-700 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="text-white h-6 w-6" /> : <Menu className="text-white h-6 w-6" />}
        </button>
      </div>

      <div className={`fixed md:hidden inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                href={item.path} 
                key={item.name}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl w-64 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-xl' : 'hover:bg-gray-800 text-gray-400 hover:text-white'}`}
              >
                <item.icon className="h-6 w-6" />
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 pt-24 bg-gradient-to-b from-gray-900 to-slate-900 border-r border-gray-800">
        <div className="px-4 py-2">
          <Link href="/" className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">AU</span>
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">VI</span>
            </h1>
          </Link>
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  href={item.path}
                  key={item.name}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${isActive ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-700 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                >
                  {isActive && <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-700/20 blur-xl"></span>}
                  <item.icon className={`h-5 w-5 z-10 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className="font-medium text-sm z-10">{item.name}</span>
                  {isActive && <span className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-lg"></span>}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
            <UserCircle className="h-5 w-5" />
            <span className="font-medium text-sm">Settings</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;