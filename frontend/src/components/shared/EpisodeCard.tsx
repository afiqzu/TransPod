import { Button } from "@/components/ui/button.tsx";
import { Episode } from "@/types";
import { formatDuration } from "@/lib/utils.ts";
import { AudioWaveform } from "lucide-react";
import {useNavigate} from "react-router-dom";

type EpisodeCardProps = {
  episode: Episode;
};
const EpisodeCard = ({ episode }: EpisodeCardProps) => {
    const navigate = useNavigate()

  const handleEpisodeClick = () => {
      navigate(`/episode/${episode.id}`);

  }

  return (
    <div className="flex justify-center items-center rounded-md w-full mb-3 sm:mb-5 pt-3 sm:pt-5 border-t-2">
      <div className="flex flex-col w-full mr-5">
        <p className="self-start font-medium text-[14px] sm:text-[18px]">
          {episode.title}
        </p>
        <p className="self-start text-[12px] sm:text-[14px] mb-2">
          {episode.datePublishedPretty} · {formatDuration(episode.duration)}
        </p>
      </div>
      <Button className="shad-button_primary mr-auto rounded-full" onClick={handleEpisodeClick}>
        <AudioWaveform />
      </Button>
    </div>
  );
};
export default EpisodeCard;
