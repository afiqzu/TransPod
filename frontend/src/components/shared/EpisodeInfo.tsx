import { EpisodeDetails } from "@/types";

type LeftPodcastBarProps = {
  episode: EpisodeDetails;
};

const EpisodeInfo = ({ episode }: LeftPodcastBarProps) => {
  return (
    <div className="bottom-0 z-50 flex w-full border-t-2 bg-white p-3">
      <img
        className="flex w-[40px] justify-center object-scale-down sm:w-[70px]"
        src={episode.image}
        alt={episode.title}
      />
      <div className="mx-3 flex flex-col">
        <p className="line-clamp-1 self-start text-[12px] font-medium sm:text-[16px]">
          {episode.title}
        </p>
        <p className="self-start text-[12px] sm:text-[16px]">
          {episode.podcastName}
        </p>
      </div>
    </div>
  );
};
export default EpisodeInfo;
