import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import ChatPrompts from "@/components/chat/ChatPrompts.tsx";

const Chat = () => {
  return (
    <div className="flex flex-col h-full bg-white border-l-2 p-3 overflow-scroll">
      <ChatMessage />
      <div className="mt-auto">
        <ChatPrompts />
        <ChatInput />
      </div>
    </div>
  );
};
export default Chat;
