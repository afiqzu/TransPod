import { ring } from "ldrs";

const LoadingScreen = () => {
  ring.register();
  return (
    <div className="flex h-screen w-screen fixed bg-white z-50 justify-center items-center">
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
