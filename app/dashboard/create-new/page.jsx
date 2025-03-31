"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Palette,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import PrettyLoader from "../_components/loader";

const VIDEO_STYLES = [
  { id: "cartoon", icon: <Camera />, label: "Cartoon" },
  { id: "realistic", icon: <Camera />, label: "Realistic" },
  { id: "anime", icon: <Camera />, label: "Anime" },
  { id: "3d", icon: <Camera />, label: "3D" },
];

const DURATION_OPTIONS = ["30 seconds", "1 minute", "2 minutes", "3 minutes"];

const VIDEO_TOPICS = [
  "Custom",
  "Education",
  "Entertainment",
  "Marketing",
  "Tutorial",
  "Personal Story",
];

function CreateNew() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [customTopicText, setCustomTopicText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [captions, setCaptions] = useState(null);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    if (
      !(
        selectedTopic &&
        selectedStyle &&
        selectedDuration &&
        (selectedTopic !== "Custom" || customTopicText)
      )
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const topic = selectedTopic === "Custom" ? customTopicText : selectedTopic;
    const prompt = `write a script to generate ${selectedDuration} video on topic: ${topic} along with AI images prompt in ${selectedStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

    setIsLoading(true);
    setApiResponse(null);
    setAudioUrl(null);
    setCaptions(null);
    setError(null);

    try {
      // Step 1: Generate script from Gemini API
      const scriptResponse = await fetch("/api/get-video-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!scriptResponse.ok) {
        throw new Error(`Script API error! status: ${scriptResponse.status}`);
      }

      const scriptData = await scriptResponse.json();
      if (scriptData.error) {
        throw new Error(scriptData.error);
      }

      const scriptScenes = Array.isArray(scriptData.result) ? scriptData.result : [];
      if (scriptScenes.length === 0) {
        throw new Error("No scenes found in script response");
      }

      setApiResponse(scriptScenes);
      console.log("Script Response:", scriptScenes);

      // Step 2: Clean and merge ContentText for audio
      const cleanedText = scriptScenes
        .map((scene) =>
          scene.ContentText.replace(/Scene \d+: \[\d+-\d+ seconds\]\s*/i, "")
        )
        .join(" ");
      console.log("Cleaned Text for Audio:", cleanedText);

      // Step 3: Generate audio
      const audioResponse = await fetch("/api/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanedText }),
      });

      if (!audioResponse.ok) {
        throw new Error(`Audio API error! status: ${audioResponse.status}`);
      }

      const audioData = await audioResponse.json();
      if (audioData.error) {
        throw new Error(audioData.error);
      }

      setAudioUrl(audioData.audioUrl);
      console.log("Audio URL:", audioData.audioUrl);

      // Step 4: Generate captions from audio with timestamps
      const captionResponse = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioUrl: audioData.audioUrl }),
      });

      if (!captionResponse.ok) {
        throw new Error(`Caption API error! status: ${captionResponse.status}`);
      }

      const captionData = await captionResponse.json();
      if (captionData.error) {
        throw new Error(captionData.error);
      }

      setCaptions(captionData.captions);
      console.log("Captions with Timestamps:", captionData.captions);
    } catch (error) {
      console.error("Error:", error);
      setError(`Failed to generate video/audio/captions: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.div
      className="space-y-8 p-8 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="text-center">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 bg-clip-text text-transparent"
        >
          Create New Video
        </motion.h1>
        <motion.p
          variants={subheadingVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-400 mt-2 text-lg md:text-xl"
        >
          Craft your next masterpiece with AUVI's AI magic
        </motion.p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-gray-900/90 via-indigo-900/80 to-violet-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-8 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-4 mb-8">
          <label className="flex items-center text-lg font-semibold text-indigo-200">
            <Palette className="mr-2" /> Video Topic
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {VIDEO_TOPICS.map((topic) => (
              <motion.button
                key={topic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedTopic(topic);
                  if (topic !== "Custom") setCustomTopicText("");
                }}
                className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                  selectedTopic === topic
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                {topic}
                {selectedTopic === topic && (
                  <CheckCircle className="ml-2 inline" size={16} />
                )}
              </motion.button>
            ))}
          </div>
          {selectedTopic === "Custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <textarea
                value={customTopicText}
                onChange={(e) => setCustomTopicText(e.target.value)}
                placeholder="Enter your custom video topic..."
                className="w-full p-4 rounded-lg bg-gray-800/70 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                rows="3"
              />
            </motion.div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center text-lg font-semibold text-indigo-200">
            <Camera className="mr-2" /> Video Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {VIDEO_STYLES.map(({ id, icon, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStyle(id)}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                  selectedStyle === id
                    ? "bg-violet-600 text-white border-violet-700 shadow-md"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                {React.cloneElement(icon, {
                  size: 28,
                  className: selectedStyle === id ? "text-white" : "text-violet-400",
                })}
                <span className="mt-2 text-sm">{label}</span>
                {selectedStyle === id && <CheckCircle className="mt-2" size={16} />}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center text-lg font-semibold text-indigo-200">
            <Clock className="mr-2" /> Video Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            {DURATION_OPTIONS.map((duration) => (
              <motion.button
                key={duration}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDuration(duration)}
                className={`flex items-center justify-center p-3 rounded-lg border transition-all text-sm font-medium ${
                  selectedDuration === duration
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                <Clock className="mr-2" size={16} />
                {duration}
                {selectedDuration === duration && (
                  <CheckCircle className="ml-2" size={16} />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 mb-4"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          disabled={
            !(
              selectedTopic &&
              selectedStyle &&
              selectedDuration &&
              (selectedTopic !== "Custom" || customTopicText)
            ) || isLoading
          }
          className={`w-full flex items-center justify-center p-4 rounded-lg text-lg font-semibold transition-all shadow-lg ${
            selectedTopic &&
            selectedStyle &&
            selectedDuration &&
            (selectedTopic !== "Custom" || customTopicText) &&
            !isLoading
              ? "bg-gradient-to-r from-indigo-600 to-violet-700 text-white hover:from-indigo-700 hover:to-violet-800"
              : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <PrettyLoader />
          ) : (
            <>
              Create Video <ArrowRight className="ml-2" size={20} />
            </>
          )}
        </motion.button>

        {apiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-gray-800/70 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-indigo-200 mb-4">
              Generated Video Scenes
            </h3>
            <div className="space-y-4">
              {apiResponse.map((scene, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <p className="text-gray-300 font-medium">{scene.ContentText}</p>
                  <p className="text-gray-400 text-sm mt-1">{scene.imagePrompt}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {audioUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-gray-800/70 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-indigo-200 mb-4">
              Generated Audio
            </h3>
            <audio controls src={audioUrl} className="w-full" />
            <a
              href={audioUrl}
              download="generated-audio.mp3"
              className="text-indigo-400 hover:text-indigo-300 underline mt-2 inline-block"
            >
              Download Audio
            </a>
          </motion.div>
        )}

        {captions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-gray-800/70 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-indigo-200 mb-4">
              Generated Captions with Timestamps
            </h3>
            <div className="space-y-2">
              {captions.map((caption, index) => (
                <div key={index} className="text-gray-300">
                  <span className="font-medium">
                    [{(caption.start / 1000).toFixed(2)}s - {(caption.end / 1000).toFixed(2)}s]
                  </span>{" "}
                  {caption.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default CreateNew;