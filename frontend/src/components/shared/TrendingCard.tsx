import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useNavigate } from "react-router-dom";
import { ListVideo } from "lucide-react";

type TrendingCardProps = {
  id: string;
  image: string;
  title: string;
  author: string;
};
const TrendingCard = ({ id, image, title, author }: TrendingCardProps) => {
  const navigate = useNavigate();

  const handlePodcastClick = () => {
    navigate(`/podcast/${id}`);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-md w-auto p-2">
      <img src={image} alt={title} height={200} width={200} />
      <p className="self-start font-medium text-[18px]">{title}</p>
      <p className="self-start text-[14px] mb-5">by {author}</p>
      <Button
        className="shad-button_primary mt-auto ml-auto p-3 rounded-full"
        onClick={handlePodcastClick}
      >
        <ListVideo />
      </Button>
    </div>
  );
};
export default TrendingCard;

export const TrendingCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center rounded-md w-auto p-2 gap-2">
      <Skeleton className="h-[200px] w-[200px] " />
      <Skeleton className="h-[18px] w-[200px]" />
      <Skeleton className="h-[14px] w-[200px]" />
    </div>
  );
};
