import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

function EmptyState({ videoList }) {
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

  return (
    <motion.div variants={itemVariants}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recent Videos</h2>
        <button className="text-indigo-400 flex items-center space-x-1 hover:text-indigo-300 transition-colors">
          <span>View all</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.length === 0 ? (
          <motion.div 
            className="col-span-full bg-gray-900/70 border border-gray-800 rounded-xl p-8 text-center"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-900/50 flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-indigo-300" />
            </div>
            <h3 className="text-xl font-medium mb-2">No videos yet</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              You haven't created any videos with AUVI yet. Start by creating your first AI-powered video.
            </p>
      
            <Link href="/dashboard/create-new">
              <button className="text-indigo-400 underline hover:text-indigo-300 transition-colors">
                Create your first video
              </button>
            </Link>
          </motion.div>
        ) : (
          <p>Videos aayenge jab list bhar jayegi!</p> 
        )}
      </div>
    </motion.div>
  );
}

export default EmptyState;