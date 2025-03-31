import React from 'react'
import Header from './_components/Header';
import SideNav from './_components/SideNav';

function DashboardLayout({children}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white"> 
      <Header />
      <SideNav />
      <div className="md:pl-64 pt-20 min-h-screen"> 
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;