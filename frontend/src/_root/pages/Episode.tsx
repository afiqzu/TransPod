import { useParams } from "react-router-dom";
import { useGetEpisodesById } from "@/lib/tanstack-query/queriesAndMutations.ts";
import EpisodeInfo from "@/components/shared/EpisodeInfo.tsx";
import EpisodeContent from "@/components/shared/EpisodeContent.tsx";
import Chat from "@/components/chat/Chat.tsx";
import { ring } from "ldrs";
import { Frown } from "lucide-react";

const Episode = () => {
  const { id } = useParams();
  const { data: episode, isPending } = useGetEpisodesById(id);
  const isTranscribing = false;
  ring.register();

  return (
    <>
      {isPending || isTranscribing ? (
        <div className="flex flex-col h-fit w-screen justify-center items-center">
          <l-ring
            size="80"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="black"
          ></l-ring>
          <p className="font-medium text-2xl mt-5">Transcribing episode...</p>
        </div>
      ) : !episode || !episode.title ? (
        <div className="flex h-fit gap-3 w-full items-center justify-center text-2xl font-medium">
          Episode not found <Frown />
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 h-full overflow-scroll">
            <EpisodeContent />
            <div className="hidden sm:block">
              <Chat />
            </div>
          </div>
          <EpisodeInfo episode={episode} />
        </div>
      )}
    </>
  );
};
export default Episode;
