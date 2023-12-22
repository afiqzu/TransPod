import { ring } from "ldrs";

const LoadingScreen = () => {
  ring.register();
  return (
    <div className="fixed z-50 flex h-screen w-screen items-center justify-center bg-white">
      <l-ring
        size="20"
        stroke="2"
        bg-opacity="0"
        speed="2"
        color="black"
      ></l-ring>
    </div>
  );
};
export default LoadingScreen;
