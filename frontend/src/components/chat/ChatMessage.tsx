import { Message } from "@/types";

type ChatMessageProps = {
  message: Message;
};
const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`${
        message.role === "user"
          ? "ml-auto bg-primary-600 text-white"
          : "mr-auto border-[1px] border-primary-800 bg-white text-primary-800"
      } mb-3 flex w-fit max-w-lg rounded-md px-3 py-2 text-[14px] `}
    >
      {message.content}
    </div>
  );
};
export default ChatMessage;
