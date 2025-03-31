"use client";

import { useEffect } from "react";

export default function TitleUpdater() {
  useEffect(() => {
    const defaultTitle = "AUVI - AI Video Editor";
    const messages = [
      "😢 I am lonely! Please visit me!",
      "🥹 Don't leave me alone...",
      "👀 I'm still here, you know...",
      "😔 Was it something I said?",
      "🎥 Your AI videos miss you!",
    ];

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = messages[Math.floor(Math.random() * messages.length)];
      } else {
        document.title = defaultTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; 
}
