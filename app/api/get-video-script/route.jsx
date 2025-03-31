import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    console.log("Prompt:", prompt);

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    console.log("AI Response:", responseText);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
      // Check agar response ek object hai aur usme 'videoScript' key hai
      if (parsedResponse.videoScript && Array.isArray(parsedResponse.videoScript)) {
        parsedResponse = parsedResponse.videoScript; // videoScript array
      } else if (!Array.isArray(parsedResponse)) {
        throw new Error("AI response is not an array or does not contain videoScript array");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON response from AI", rawText: responseText },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: parsedResponse });
  } catch (error) {
    console.error("Error in API route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}