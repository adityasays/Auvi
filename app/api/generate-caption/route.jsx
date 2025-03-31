import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API,
    });

    const { audioUrl } = await req.json();
    if (!audioUrl) {
      return NextResponse.json({ error: "Audio URL missing" }, { status: 400 });
    }

    const data = {
      audio: audioUrl,
      punctuate: true, 
      format_text: true, 
    };

    const transcript = await client.transcripts.transcribe(data);

    if (!transcript.id) {
      return NextResponse.json({ error: "Failed to start transcription" }, { status: 500 });
    }

    let result = await client.transcripts.get(transcript.id);
    while (result.status !== "completed" && result.status !== "error") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      result = await client.transcripts.get(transcript.id);
    }

    if (result.status === "error") {
      return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
    }

    // Sentence-level captions with timestamps
    const sentences = await client.transcripts.sentences(transcript.id);
    const captions = sentences.sentences.map((sentence) => ({
      text: sentence.text,
      start: sentence.start, // Start time in milliseconds
      end: sentence.end,    // End time in milliseconds
    }));

    if (!captions.length) {
      return NextResponse.json({ error: "No captions generated" }, { status: 500 });
    }

    return NextResponse.json({ captions });
  } catch (e) {
    console.error("Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}