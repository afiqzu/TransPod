import {Input} from "@/components/ui/input.tsx";
import {useGetTrending} from "@/lib/tanstack-query/queriesAndMutations.ts";
import TrendingCard, {TrendingCardSkeleton} from "@/components/shared/TrendingCard.tsx";
import {PodcastTrending} from "@/types";


const Home = () => {
    const {data: trending, isPending} = useGetTrending()
    const numberOfSkeletons = 9;

    return (
        <div>
            <div className='max-w-2xl ml-auto mr-auto flex flex-col mt-10'>
                <p className='font-medium text-2xl'>
                    TransPod: Efficient Podcast Transcription
                </p>
                <p className='text-xl'>
                    Simple, Accurate, Fast
                </p>
                <p className='mt-5'>
                    TransPod offers hassle-free podcast transcription.
                    Ideal for podcasters, journalists, and content creators.
                    Get reliable transcriptions without the fluff - try TransPod now.
                </p>
                <Input className='mt-10 rounded-full' placeholder='Search for podcasts'/>
                <p className='font-medium text-xl mt-10'>
                    See what's trending
                </p>
                <div className='grid grid-cols-3 gap-4 mt-5 mb-10'>
                    { isPending? Array.from({ length: numberOfSkeletons }, (_, index) => (
                        <TrendingCardSkeleton key={index} />
                    )) : trending?.map((podcast:PodcastTrending) => (
                        <TrendingCard key={podcast.id} title={podcast.title} image={podcast.artwork} author={podcast.author}/>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default Home
