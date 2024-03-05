import OpenAI from "openai";
import { sampleTranscription } from "@/lib/utils.ts";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export const generateChatMessage = async (userInput: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: sampleTranscription },
      {
        role: "system",
        content:
          "When generating a transcript response, do not use in-text formatting such as using asterisks for bold text. when making a new line, ensure that you enter two newline spaces.",
      },
      { role: "user", content: userInput },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message;
};

export const generateSummary = async (transcript: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Generate a summary based on this transcript: " + transcript,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message;
};
