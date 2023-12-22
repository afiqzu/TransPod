const ChatPrompts = () => {
  const prompts: string[] = [
    "What are the key points from the podcast?",
    "Identify any action items or recommendations given in the episode.",
  ];
  return (
    <div className="mb-6 grid grid-cols-1 gap-1 lg:grid-cols-2">
      {prompts.map((prompt: string) => (
        <div
          className="my-2 w-fit cursor-pointer rounded-xl border-[1px] border-primary-800 px-4 py-2 text-[14px] text-primary-800"
          key={prompt}
        >
          {prompt}
        </div>
      ))}
    </div>
  );
};
export default ChatPrompts;
