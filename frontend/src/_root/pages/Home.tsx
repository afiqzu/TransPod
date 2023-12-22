import TrendingGrid from "@/components/shared/TrendingGrid.tsx";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <div className="ml-auto mr-auto flex flex-col items-center mt-[220px]">
      <div className="max-w-3xl flex flex-col items-center mt-10 mb-[150px]">
        <p className="font-bold text-3xl sm:text-6xl text-center px-4">
          Get accurate podcast transcription with TransPod.
        </p>
        <p className="mt-[40px] max-w-2xl text-center px-4 mb-[50px]">
          TransPod offers hassle-free podcast transcription. Ideal for
          podcasters, journalists, and content creators. Get reliable
          transcriptions without the fluff.
        </p>
      </div>
      <div className="flex flex-col h-max w-full py-10">
        <div
          ref={ref}
          className={`transition-opacity duration-1000 ${
            inView ? "opacity-100 animate-fadein" : "opacity-0"
          }`}
        >
          <TrendingGrid />
        </div>
      </div>
    </div>
  );
};
export default Home;
