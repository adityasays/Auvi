import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { storage } from "@/configs/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Google Text-to-Speech client
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text input missing" }, { status: 400 });
    }

    const request = {
      input: { text: text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    const fileName = `audio-${Date.now()}.mp3`;
    const storageRef = ref(storage, `myFolder/audio/${fileName}`);
    await uploadBytes(storageRef, response.audioContent);
    const audioUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ audioUrl });
  } catch (e) {
    console.error("Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}