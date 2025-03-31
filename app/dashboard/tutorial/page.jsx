"use client";
import React from "react";
import { motion } from "framer-motion";
import { Video, Play } from "lucide-react";

const TUTORIALS = [
  { title: "Getting Started with AUVI", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Creating Your First Video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Advanced Editing Tips", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

function Tutorial() {
  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-white text-center bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 bg-clip-text text-transparent"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tutorials
      </motion.h1>
      <motion.p
        className="text-gray-400 text-center text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Learn how to make the most of AUVI with our video guides
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TUTORIALS.map((tutorial) => (
          <motion.div
            key={tutorial.title}
            className="bg-gradient-to-br from-gray-900/90 to-indigo-900/80 border border-indigo-500/30 rounded-xl p-6 shadow-xl"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative aspect-video mb-4">
              <iframe
                src={tutorial.videoUrl}
                title={tutorial.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-12 w-12 text-white opacity-75" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white">{tutorial.title}</h2>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Tutorial;