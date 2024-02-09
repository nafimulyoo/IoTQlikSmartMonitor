import fs from "fs";
import OpenAI from "openai";

import { NextResponse } from "next/server";

const openai = new OpenAI();
export async function POST(request: Request) {

  const req = await request.json()
  const base64Audio = req.file;
  const audio = Buffer.from(base64Audio, 'base64');
  fs.writeFileSync("audio.mp3", audio);  
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "whisper-1",
  });
  return NextResponse.json({ blob: audio, text: transcription.text });
}