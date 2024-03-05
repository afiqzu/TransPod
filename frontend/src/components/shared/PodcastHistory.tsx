import { useGetPodcastHistory } from "@/lib/tanstack-query/queriesAndMutations.ts";
import { PodcastsHistory } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import { useNavigate } from "react-router-dom";

const PodcastHistory = () => {
  const { data, isPending } = useGetPodcastHistory();
  const navigate = useNavigate();

  const handlePodcastClick = (id: string) => {
    navigate(`/podcast/${id}`);
  };

  return (
    <div className="w-full max-w-7xl">
      {isPending ? (
        <div></div>
      ) : (
        <>
          {data.length > 5 && !isPending && (
            <>
              <p className="mb-3 mt-16 self-start text-2xl font-medium tracking-tight text-black">
                Jump back in
              </p>
              <Carousel
                opts={{
                  align: "end",
                }}
              >
                <CarouselContent className="max-w-screen-2xl">
                  {data.map((podcast: PodcastsHistory) => (
                    <CarouselItem
                      className="basis-1/2 sm:basis-1/3 lg:basis-1/5 2xl:basis-1/6"
                      key={podcast.podcastId}
                    >
                      <div
                        onClick={() => handlePodcastClick(podcast.podcastId)}
                        className="flex h-full cursor-pointer flex-col items-center gap-1 rounded-md text-[12px]"
                      >
                        <img
                          src={podcast.imageUrl}
                          alt="podcast"
                          className="rounded-md shadow-lg"
                        />
                        <p className="line-clamp-2"> {podcast?.title}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default PodcastHistory;
