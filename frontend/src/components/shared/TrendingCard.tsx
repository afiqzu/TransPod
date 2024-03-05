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
      className="flex cursor-pointer flex-col rounded-md drop-shadow-xl bg-stone-900 text-white hover:scale-105 hover:transition-all"
      onClick={handlePodcastClick}
    >
      <img
        src={image}
        alt={title}
        className="min-h-[200px] min-w-[200px] rounded-t-md sm:min-h-[250px] sm:min-w-[250px]"
      />
      <div className="px-4 pb-5 pt-3">
        <p className="line-clamp-2 self-start text-[18px] font-medium">
          {title}
        </p>
        <p className="line-clamp-2 self-start text-[14px]">{author}</p>
      </div>
    </div>
  );
};
export default TrendingCard;

export const TrendingCardSkeleton = () => {
  return (
    <div className="mt-4 flex w-auto flex-col items-center gap-2 rounded-md p-2">
      <Skeleton className="h-[300px] w-[300px] " />
      <Skeleton className="h-[18px] w-[300px]" />
      <Skeleton className="h-[14px] w-[300px]" />
    </div>
  );
};
