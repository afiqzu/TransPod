import TrendingCard, {
  TrendingCardSkeleton,
} from "@/components/shared/TrendingCard.tsx";
import { PodcastTrending } from "@/types";
import { useGetTrending } from "@/lib/tanstack-query/queriesAndMutations.ts";

const TrendingGrid = () => {
  const { data: trending, isPending } = useGetTrending();
  const numberOfSkeletons = 12;

  return (
    <div className="flex w-full bg-black pb-[70px] pt-10">
      {isPending ? (
        Array.from({ length: numberOfSkeletons }, (_, index) => (
          <TrendingCardSkeleton key={index} />
        ))
      ) : (
        <div className="flex w-full flex-col">
          <div className="mb-3 flex w-3/4 self-center px-4 text-2xl font-medium tracking-tight text-white">
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
export default TrendingGrid;
