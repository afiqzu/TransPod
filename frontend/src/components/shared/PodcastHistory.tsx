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
    <div className="w-full">
      {isPending ? (
        <div></div>
      ) : (
        <>
          {data.length > 5 && !isPending && (
            <>
              <p className="mb-3 mt-16 self-start text-2xl font-medium tracking-tight text-black">
                Jump back in
              </p>
              <Carousel opts={{ slidesToScroll: 5 }}>
                <CarouselContent>
                  {data.map((podcast: PodcastsHistory) => (
                    <CarouselItem
                      className="basis-1/3 sm:basis-1/4 lg:basis-1/5"
                      key={podcast.podcastId}
                    >
                      <div
                        onClick={() => handlePodcastClick(podcast.podcastId)}
                        className="flex h-full cursor-pointer flex-col items-center gap-1 rounded-md border-2 p-1 text-[12px]"
                      >
                        <img src={podcast.imageUrl} alt="podcast" />
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
