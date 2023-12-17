import { PodcastDetails } from "@/types";

type PodcastCardProps = {
  podcast: PodcastDetails;
};

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  return (
    <div className="sm:flex justify-center items-center rounded-md w-full mb-5">
      <div className="flex justify-center mb-3 sm:mb-0">
        <img
          className="object-scale-down w-[200px] sm:w-[250px]"
          src={podcast.artwork}
          alt={podcast.title}
        />
      </div>
      <div className="flex flex-col w-full sm:ml-5 mt-auto">
        <p className="self-start font-medium text-[24px] sm:text-[40px]">
          {podcast.title}
        </p>
        <p className="self-start text-[16px] font-medium text-green-800">
          {podcast.author}
        </p>
        <p className="self-start text-[14px] sm:text-[16px] mb-3 sm:mb-5 line-clamp-5 sm:line-clamp-3">
          {podcast.description}
        </p>
        <p className="self-start text-[16px]">
          {podcast.episodeCount} episodes
        </p>
      </div>
    </div>
  );
};
export default PodcastCard;
