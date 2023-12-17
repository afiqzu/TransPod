import TrendingGrid from "@/components/shared/TrendingGrid.tsx";

const Home = () => {
  return (
    <div>
      <div className="max-w-2xl ml-auto mr-auto flex flex-col mt-10 px-4">
        <p className="font-medium text-2xl">
          TransPod: Efficient Podcast Transcription
        </p>
        <p className="text-xl">Simple, Accurate, Fast</p>
        <p className="mt-5">
          TransPod offers hassle-free podcast transcription. Ideal for
          podcasters, journalists, and content creators. Get reliable
          transcriptions without the fluff - try TransPod now.
        </p>
        <p className="font-medium text-xl mt-10">See what's trending</p>
        <TrendingGrid />
      </div>
    </div>
  );
};
export default Home;
