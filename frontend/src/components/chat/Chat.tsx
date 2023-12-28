import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import ChatPrompts from "@/components/chat/ChatPrompts.tsx";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types";

const Chat = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [conversation, setConversation] = useState<Message[]>([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleNewInput = (input: Message) => {
    setConversation((prev) => [...prev, input]);
  };

  const handleNewResponse = (response: Message) => {
    setConversation((prev) => [...prev, response]);
  };

  return (
    <div className="flex h-full flex-col overflow-scroll border-l-[1px] bg-white">
      <div className="flex h-[50px] items-center border-b-2 px-3 py-4 text-sm font-medium">
        Chat
      </div>
      <div className="overflow-scroll p-3">
        {conversation.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
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
