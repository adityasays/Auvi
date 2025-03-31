'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Clock } from 'lucide-react';
import EmptyState from './_components/EmptyState'; // Pehle wala EmptyState, ab recent videos ke liye bhi yahi use hoga
import Link from 'next/link';

function Dashboard() {
  const [videoList, setVideoList] = useState([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to AUVI, your AI video creation platform</p>
      </motion.div>
      
      {/* Create New Video - Prominent Section */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-900/50 via-violet-900/50 to-indigo-900/50 backdrop-blur-sm border border-indigo-500/30 rounded-xl overflow-hidden shadow-xl"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Create Your Next AI Video</h2>
            <p className="text-indigo-200 mt-2 max-w-xl">Transform your ideas into stunning videos with our advanced AI technology. Start creating in minutes.</p>
          </div>
          
          <Link href="/dashboard/create-new">
            <motion.button 
              className="flex items-center space-x-2 bg-white text-indigo-900 py-3 px-6 rounded-full font-medium text-lg shadow-lg hover:shadow-indigo-500/20"
              whileTap={{ scale: 0.97 }}
              animate={pulseAnimation}
            >
              <Plus className="h-5 w-5" />
              <span>Create New Video</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
      
      <EmptyState videoList={videoList} /> 

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold">Usage Stats</h2>
            <p className="text-gray-400 text-sm mt-1">Your platform usage this month</p>
          </div>
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Videos Generated</span>
              <span className="text-lg font-medium">0/10</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <motion.div 
                className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-6 flex items-center text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              <span>Resets in 28 days</span>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div 
          className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <p className="text-gray-400 text-sm mt-1">Shortcuts to get started</p>
          </div>
          <div className="p-6 border-t border-gray-800 space-y-3">
            <motion.button 
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-lg text-white font-medium flex items-center justify-between"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Browse Templates</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button 
              className="w-full py-3 px-4 bg-gray-800 rounded-lg text-gray-300 font-medium flex items-center justify-between"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Upgrade Plan</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button 
              className="w-full py-3 px-4 bg-gray-800 rounded-lg text-gray-300 font-medium flex items-center justify-between"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Tutorial Videos</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;