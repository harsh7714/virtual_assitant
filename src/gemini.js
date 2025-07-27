import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCCgSQN4Zff9lQVYZtQBmhfQqTTuEWbOvg" });
async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config:{
        maxOutputTokens:100,
        temperature: 2.0,
    }
  });
  console.log(response.text)
  return response.text;
}

export default main;