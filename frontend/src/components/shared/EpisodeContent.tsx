import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useGetSummary } from "@/lib/tanstack-query/queriesAndMutations.ts";
import { ring } from "ldrs";
import { sampleTranscription } from "@/lib/utils.ts";

const EpisodeContent = () => {
  ring.register();

  const { data: summary, isPending: isGettingTranscription } =
    useGetSummary(sampleTranscription);

  return (
    <div className="h-full">
      <Tabs defaultValue="transcript" className="h-full pb-[50px]">
        <TabsList className="flex justify-start">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <div className="h-full overflow-auto px-5 sm:px-7 sm:py-3">
          <TabsContent value="transcript">
            <div className=" whitespace-pre-line">
              {sampleTranscription}
            </div>
          </TabsContent>
          <TabsContent value="summary" className="h-full">
            {isGettingTranscription ? (
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
              <div>{summary && summary.content}</div>
              //<div>Summary</div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
export default EpisodeContent;
