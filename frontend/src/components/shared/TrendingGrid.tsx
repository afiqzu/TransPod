import TrendingCard, {
  TrendingCardSkeleton,
} from "@/components/shared/TrendingCard.tsx";
import { PodcastTrending } from "@/types";
import { useGetTrending } from "@/lib/tanstack-query/queriesAndMutations.ts";

const TrendingGrid = () => {
  const { data: trending, isPending } = useGetTrending();
  const numberOfSkeletons = 12;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 mb-10">
      {isPending
        ? Array.from({ length: numberOfSkeletons }, (_, index) => (
            <TrendingCardSkeleton key={index} />
          ))
        : trending?.map((podcast: PodcastTrending) => (
            <TrendingCard
              key={podcast.id}
              id={podcast.id}
              title={podcast.title}
              image={podcast.artwork}
              author={podcast.author}
            />
          ))}
    </div>
  );
};
export default TrendingGrid;
