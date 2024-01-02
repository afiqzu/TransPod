import { Button } from "@/components/ui/button.tsx";
import { PodcastSearch } from "@/types";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useNavigate } from "react-router-dom";

type SearchCardProps = {
  podcast: PodcastSearch;
};
const SearchCard = ({ podcast }: SearchCardProps) => {
  const navigate = useNavigate();

  const handlePodcastClick = () => {
    navigate(`/podcast/${podcast.id}`);
  };

  const handleMobileClick = () => {
    if (innerWidth < 640) {
      navigate(`/podcast/${podcast.id}`);
    }
  };

  return (
    <div
      className="mb-2 flex w-full cursor-pointer justify-center rounded-md bg-white p-3 sm:mb-5 sm:cursor-default"
      onClick={handleMobileClick}
    >
      <div className="flex max-w-[60px] sm:max-w-[150px] md:max-w-[250px]">
        <img
          className="object-scale-down"
          src={podcast.artwork}
          alt={podcast.title}
        />
      </div>
      <div className="ml-5 flex w-full flex-col">
        <p className="self-start text-[14px] font-medium sm:text-[18px]">
          {podcast.title}
        </p>
        <p className="mb-2 self-start text-[12px] sm:text-[14px]">
          {podcast.author}
        </p>
        <div className="mb-2 hidden w-full flex-wrap gap-2 sm:flex">
          {podcast.categories &&
            Object.values(podcast.categories).map((name, index) => (
              <div
                key={index}
                className="rounded-full bg-light-2 px-3 py-1 text-[13px]"
              >
                {name}
              </div>
            ))}
        </div>
        <p className="mb-5 line-clamp-3 hidden w-full flex-wrap self-start break-words text-[14px] sm:block lg:line-clamp-5">
          {podcast.description}
        </p>
        <div className="hidden sm:mt-auto sm:block">
          <Button
            className="shad-button_primary ml-auto"
            onClick={handlePodcastClick}
          >
            View Episodes
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SearchCard;

export const SearchCardSkeleton = () => {
  return (
    <div className="mb-5 flex w-full justify-center rounded-md sm:py-3">
      <Skeleton className="h-[60px] w-full sm:h-[250px] sm:w-[320px]" />
      <div className="hidden w-full sm:ml-5 sm:flex sm:flex-col">
        <Skeleton className="hidden sm:mb-4 sm:block sm:h-[30px] sm:w-[400px]" />
        <Skeleton className=" hidden sm:mb-4 sm:block sm:h-[30px] sm:w-[400px]" />
        <Skeleton className="hidden sm:block sm:h-[60px] sm:w-full" />
      </div>
    </div>
  );
};
