import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import ChatPrompts from "@/components/chat/ChatPrompts.tsx";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types";
import { LoadingSpinner } from "@/components/shared/LoadingScreen.tsx";

const Chat = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleNewInput = (input: Message) => {
    setConversation((prev) => [...prev, input]);
    setIsLoading(true);
  };

  const handleNewResponse = (response: Message) => {
    setConversation((prev) => [...prev, response]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full flex-col overflow-auto border-l-[1px] bg-white">
      <div className="flex h-[50px] items-center border-b-2 px-3 py-4 text-sm font-medium">
        Chat
      </div>
      <div className="overflow-auto p-3">
        {conversation.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="mb-3 mr-auto flex w-fit max-w-lg items-center gap-2 rounded-md bg-green-700 px-3 py-2 text-[14px] text-white">
            <p>Generating</p>
            <LoadingSpinner />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-auto">
        {conversation.length === 0 && (
          <ChatPrompts
            onNewInput={handleNewInput}
            onNewResponse={handleNewResponse}
          />
        )}
        <ChatInput
          onNewInput={handleNewInput}
          onNewResponse={handleNewResponse}
        />
      </div>
    </div>
  );
};
export default Chat;
