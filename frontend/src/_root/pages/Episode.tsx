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
        <div className="flex h-fit w-screen flex-col items-center justify-center">
          <l-ring
            size="80"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="black"
          ></l-ring>
          <p className="mt-5 text-2xl font-medium">Transcribing episode...</p>
        </div>
      ) : !episode || !episode.title ? (
        <div className="flex h-fit w-full items-center justify-center gap-3 text-2xl font-medium">
          Episode not found <Frown />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-70px)] flex-col sm:h-[calc(100vh-80px)]">
          <div className="grid h-full grid-cols-1 overflow-scroll sm:grid-cols-2">
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
