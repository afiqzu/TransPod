import { PodcastDetails } from "@/types";

type PodcastCardProps = {
  podcast: PodcastDetails;
};

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  return (
    <div className="mb-5 w-full items-center justify-center rounded-md sm:flex">
      <div className="mb-3 flex justify-center sm:mb-0">
        <img
          className="w-[200px] object-scale-down sm:w-[300px]"
          src={podcast.artwork}
          alt={podcast.title}
        />
      </div>
      <div className="mt-auto flex w-full flex-col sm:ml-5">
        <p className="self-start text-[24px] font-medium sm:text-[40px]">
          {podcast.title}
        </p>
        <p className="self-start text-[16px] font-medium text-green-800">
          {podcast.author}
        </p>
        <p className="mb-3 line-clamp-5 self-start text-[14px] sm:mb-5 sm:line-clamp-3 sm:text-[16px]">
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
