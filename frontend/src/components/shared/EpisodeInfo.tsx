import { EpisodeDetails } from "@/types";

type LeftPodcastBarProps = {
  episode: EpisodeDetails;
};
const EpisodeInfo = ({ episode }: LeftPodcastBarProps) => {
  return (
    <div className="flex p-3 w-full bottom-0 bg-white border-t-2 z-50">
      <img
        className="object-scale-down flex justify-center w-[40px] sm:w-[70px]"
        src={episode.image}
        alt={episode.title}
      />
      <div className='flex flex-col mx-3'>
        <p className="self-start font-medium text-[12px] sm:text-[16px] line-clamp-1">
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
