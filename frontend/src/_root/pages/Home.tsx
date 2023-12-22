import TrendingGrid from "@/components/shared/TrendingGrid.tsx";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <div className="ml-auto mr-auto mt-[220px] flex flex-col items-center">
      <div className="mb-[150px] mt-10 flex max-w-3xl flex-col items-center">
        <p className="px-4 text-center text-3xl font-bold sm:text-6xl">
          Get accurate podcast transcription with TransPod.
        </p>
        <p className="mb-[50px] mt-[40px] max-w-2xl px-4 text-center">
          TransPod offers hassle-free podcast transcription. Ideal for
          podcasters, journalists, and content creators. Get reliable
          transcriptions without the fluff.
        </p>
      </div>
      <div className="flex h-max w-full flex-col py-10">
        <div
          ref={ref}
          className={`transition-opacity duration-1000 ${
            inView ? "animate-fadein opacity-100" : "opacity-0"
          }`}
        >
          <TrendingGrid />
        </div>
      </div>
    </div>
  );
};
export default Home;
