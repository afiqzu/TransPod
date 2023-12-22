const ChatPrompts = () => {
  const prompts: string[] = [
    "What are the key points from the podcast?",
    "Identify any action items or recommendations given in the episode.",
  ];
  return (
    <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-1">
      {prompts.map((prompt: string) => (
        <div
          className="border-[1px] border-primary-800 text-primary-800 my-2 py-2 px-4 rounded-xl w-fit cursor-pointer text-[14px]"
          key={prompt}
        >
          {prompt}
        </div>
      ))}
    </div>
  );
};
export default ChatPrompts;
