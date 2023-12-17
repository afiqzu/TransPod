import { Button } from "@/components/ui/button.tsx";
import { PodcastSearch } from "@/types";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import CategoryTab from "@/components/shared/CategoryTab.tsx";
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
      className="flex justify-center bg-white rounded-md w-full p-3 mb-2 cursor-pointer sm:cursor-default sm:mb-5"
      onClick={handleMobileClick}
    >
      <div className="flex max-w-[60px] sm:max-w-[150px] md:max-w-[250px]">
        <img
          className="object-scale-down"
          src={podcast.artwork}
          alt={podcast.title}
        />
      </div>
      <div className="flex flex-col ml-5 w-full">
        <p className="self-start font-medium text-[14px] sm:text-[18px]">
          {podcast.title}
        </p>
        <p className="self-start text-[12px] sm:text-[14px] mb-2">
          {podcast.author}
        </p>
        <div className="hidden sm:flex gap-2 mb-2 w-full flex-wrap">
          {podcast.categories &&
            Object.values(podcast.categories).map((name, index) => (
              <CategoryTab key={index} category={name} />
            ))}
        </div>
        <p className="flex-wrap hidden sm:block w-full self-start text-[14px] mb-5 break-words">
          {podcast.description}
        </p>
        <div className="hidden sm:block sm:mt-auto">
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
    <div className="flex justify-center rounded-md w-full sm:py-3 mb-5">
      <Skeleton className="h-[60px] w-full sm:h-[250px] sm:w-[320px]" />
      <div className="hidden sm:flex sm:flex-col sm:ml-5 w-full">
        <Skeleton className="hidden sm:block sm:h-[30px] sm:w-[400px] sm:mb-4" />
        <Skeleton className=" hidden sm:block sm:h-[30px] sm:w-[400px] sm:mb-4" />
        <Skeleton className="hidden sm:block sm:h-[60px] sm:w-full" />
      </div>
    </div>
  );
};
