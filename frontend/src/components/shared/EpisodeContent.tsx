import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useGetSummary } from "@/lib/tanstack-query/queriesAndMutations.ts";
import { ring } from "ldrs";

const EpisodeContent = () => {
  ring.register();

  const transcription = `Host (Sarah Johnson): [00:00:00]
  Hello and welcome back to The Everyday Balance Show. I'm your host, Sarah Johnson. In today's episode, we're diving into a topic that resonates with so many of us: Work-Life Balance. We've got an exciting line-up today, including an interview with renowned work-life balance coach, David Miller. But first, let's talk about what work-life balance really means in today's world.

  [Transition Music]

  Sarah: [00:01:30]
  Work-life balance is this ever-elusive concept, isn't it? We all strive for it, but what does it actually look like? Is it a perfect split between career and personal life, or is it more about satisfaction in both areas? To explore this, we're bringing in David Miller, who has been coaching professionals on achieving work-life harmony for over a decade. Welcome to the show, David.

  David Miller: [00:02:00]
  Thanks, Sarah. It's great to be here.

  Sarah: [00:02:03]
  So, David, let's jump right in. What's your take on work-life balance?

  David: [00:02:08]
  Well, Sarah, I like to think of it as work-life harmony rather than balance. It's not about dividing your time equally but finding a rhythm that suits your personal and professional life. It's about making choices that align with your values and priorities.

  Sarah: [00:02:25]
  That's an interesting perspective. Can you share some practical tips for our listeners?

  David: [00:02:30]
  Absolutely. First, it's essential to set boundaries. Know when to switch off from work and be present in your personal life. Secondly, prioritize self-care. You can't pour from an empty cup. And finally, communicate your needs clearly, both at work and home.`;

  const { isPending: isGettingTranscription } = useGetSummary(transcription);

  return (
    <div className="h-full">
      <Tabs defaultValue="transcript" className="h-full pb-[50px]">
        <TabsList className="flex justify-start">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <div className="h-full overflow-scroll px-5 sm:px-7 sm:py-3">
          <TabsContent value="transcript" className="overflow-scroll">
            <div className="overflow-scroll whitespace-pre-line">
              {transcription}
            </div>
          </TabsContent>
          <TabsContent value="summary" className="h-full overflow-scroll">
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
              // <div>{summary && summary.content}</div>
              <div>Summary</div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
export default EpisodeContent;
