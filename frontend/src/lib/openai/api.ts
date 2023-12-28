import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export const openAIRequest = async (userInput: string) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: userInput }],
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
