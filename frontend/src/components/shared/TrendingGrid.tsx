import TrendingCard, {
  TrendingCardSkeleton,
} from "@/components/shared/TrendingCard.tsx";
import { PodcastTrending } from "@/types";
import { useGetTrending } from "@/lib/tanstack-query/queriesAndMutations.ts";

const TrendingGrid = () => {
  const { data: trending, isPending } = useGetTrending();
  const numberOfSkeletons = 12;

  return (
    <div className="flex w-full">
      {isPending ? (
        Array.from({ length: numberOfSkeletons }, (_, index) => (
          <TrendingCardSkeleton key={index} />
        ))
      ) : (
        <div>
          <p className=" flex font-medium text-2xl ml-10 sm:ml-[100px] mb-3">
            Trending podcasts
          </p>
          <div className="group flex gap-5 overflow-hidden">
            <div className="flex mt-5 mb-10 gap-5 animate-loop-scroll group-hover:paused">
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
              className="flex mt-5 mb-10 gap-5 animate-loop-scroll group-hover:paused"
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
