import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAoQK9DOs7eyMjBIOL9hwUOsx2RL7bk9-k" });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config:{
        maxOutputTokens:100,
        temperature: 2.0,
    }
  });
  return response.text;
}

export default main;