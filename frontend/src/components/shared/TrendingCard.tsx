import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

type TrendingCardProps = {
  id: string;
  image: string;
  title: string;
  author: string;
};
const TrendingCard = ({ id, image, title, author }: TrendingCardProps) => {
  const navigate = useNavigate();
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const handlePodcastClick = () => {
    navigate(`/podcast/${id}`);
  };

  return (
    <div
      ref={ref}
      className="flex flex-col bg-white rounded-md cursor-pointer hover:scale-105 hover:transition-all"
      onClick={handlePodcastClick}
    >
      <img
        src={image}
        alt={title}
        className="min-w-[150px] min-h-[150px] sm:min-h-[300px] sm:min-w-[300px] rounded-t-md"
      />
      <div className="px-4 pt-3 pb-5">
        <p className="self-start font-medium text-[18px] line-clamp-3">
          {title}
        </p>
        <p className="self-start text-[14px]">{author}</p>
      </div>
    </div>
  );
};
export default TrendingCard;

export const TrendingCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center rounded-md w-auto p-2 mt-4 gap-2">
      <Skeleton className="h-[300px] w-[300px] " />
      <Skeleton className="h-[18px] w-[300px]" />
      <Skeleton className="h-[14px] w-[300px]" />
    </div>
  );
};
