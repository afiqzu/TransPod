import { useParams } from "react-router-dom";
import {
  useGetEpisodesByFeedId,
  useGetPodcastById,
} from "@/lib/tanstack-query/queriesAndMutations.ts";
import PodcastCard from "@/components/shared/PodcastCard.tsx";
import { Episode } from "@/types";
import EpisodeCard from "@/components/shared/EpisodeCard.tsx";
import { ring } from "ldrs";

const Podcast = () => {
  const { id } = useParams();
  const { data: podcast } = useGetPodcastById(id);
  const { data: episodes, isPending: isFetchingEpisodes } =
    useGetEpisodesByFeedId(id);
  ring.register();

  return (
    <>
      {isFetchingEpisodes ? (
        <div className="flex h-fit w-screen items-center justify-center">
          <l-ring
            size="20"
            stroke="2"
            bg-opacity="0"
            speed="2"
            color="black"
          ></l-ring>
        </div>
      ) : (
        <div className="ml-auto mr-auto mt-10 flex max-w-6xl flex-col px-4 py-5 sm:py-10">
          {podcast && <PodcastCard podcast={podcast} />}
          <p className="my-2 text-[24px] font-medium sm:my-8">Episodes</p>
          <ul>
            {episodes?.map((episode: Episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default Podcast;
