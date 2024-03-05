import TrendingCard, {
  TrendingCardSkeleton,
} from "@/components/shared/TrendingCard.tsx";
import { PodcastTrending } from "@/types";
import { useGetTrending } from "@/lib/tanstack-query/queriesAndMutations.ts";

const TrendingList = () => {
  const { data: trending, isPending } = useGetTrending();
  const numberOfSkeletons = 12;

  return (
    <div className="flex w-full max-h-max pb-[70px]">
      {isPending ? (
        Array.from({ length: numberOfSkeletons }, (_, index) => (
          <TrendingCardSkeleton key={index} />
        ))
      ) : (
        <div className="flex w-full flex-col">
          <div className="mb-1 flex w-3/4 max-w-7xl self-center text-2xl font-medium tracking-tight">
            Trending podcasts
          </div>
          <div className="group flex gap-5 overflow-hidden">
            <div className="my-5 flex animate-loop-scroll gap-5 group-hover:paused">
              {trending?.map((podcast: PodcastTrending) => (
                <TrendingCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  image={podcast.artwork}
                  author={podcast.author}
                />
              ))}
            </div>
            <div
              className="my-5 flex animate-loop-scroll gap-5 group-hover:paused"
              aria-hidden="true"
            >
              {trending?.map((podcast: PodcastTrending) => (
                <TrendingCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  image={podcast.artwork}
                  author={podcast.author}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TrendingList;
