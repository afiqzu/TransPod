import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import ChatPrompts from "@/components/chat/ChatPrompts.tsx";

const Chat = () => {
  return (
    <div className="flex h-full flex-col overflow-scroll border-l-2 bg-white p-3">
      <ChatMessage />
      <div className="mt-auto">
        <ChatPrompts />
        <ChatInput />
      </div>
    </div>
  );
};
export default Chat;
