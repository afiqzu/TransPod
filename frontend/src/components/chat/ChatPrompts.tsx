import { Message } from "@/types";
import { generateChatMessage } from "@/lib/openai/api.ts";

type ChatPromptProps = {
  onNewInput: (message: Message) => void;
  onNewResponse: (message: Message) => void;
};

const ChatPrompts = ({ onNewInput, onNewResponse }: ChatPromptProps) => {
  const prompts: string[] = [
    "What are the key points from the podcast?",
    "Identify any action items or recommendations given in the episode.",
  ];

  async function onPromptClick(prompt: string) {
    onNewInput({
      role: "user",
      content: prompt,
    });
    const response = await generateChatMessage(prompt);
    if (response)
      onNewResponse({ role: response.role, content: response.content });
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-1 p-3 lg:grid-cols-2">
      {prompts.map((prompt: string) => (
        <div
          className="my-2 w-full cursor-pointer rounded-xl border-[1px] border-black px-4 py-2 text-[14px] text-black"
          key={prompt}
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </div>
      ))}
    </div>
  );
};
export default ChatPrompts;
