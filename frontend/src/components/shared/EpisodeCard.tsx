import { Button } from "@/components/ui/button.tsx";
import { Episode } from "@/types";
import { formatDuration } from "@/lib/utils.ts";
import { AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";

type EpisodeCardProps = {
  episode: Episode;
};
const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  const navigate = useNavigate();

  const handleEpisodeClick = () => {
    navigate(`/episode/${episode.id}`);
  };

  return (
    <div className="mb-3 flex w-full items-center justify-center rounded-md border-t-2 pt-3 sm:mb-5 sm:pt-5">
      <div className="mr-5 flex w-full flex-col">
        <p className="self-start text-[14px] font-medium sm:text-[18px]">
          {episode.title}
        </p>
        <p className="mb-2 self-start text-[12px] sm:text-[14px]">
          {episode.datePublishedPretty} · {formatDuration(episode.duration)}
        </p>
      </div>
      <Button
        className="shad-button_primary mr-auto rounded-full"
        onClick={handleEpisodeClick}
      >
        <AudioWaveform />
      </Button>
    </div>
  );
};
export default EpisodeCard;
