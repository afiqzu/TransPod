import {Button} from "@/components/ui/button.tsx";
import {PodcastSearch} from "@/types";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import CategoryTab from "@/components/shared/CategoryTab.tsx";

type SearchCardProps = {
    podcast: PodcastSearch
}
const SearchCard = ({podcast}: SearchCardProps) => {
    const categoryNames = Object.values(podcast.categories);

    return (
        <div className='flex justify-center bg-white rounded-md w-full p-3 mb-5'>
            <div className=' flex min-w-[250px]'>
                <img src={podcast.artwork} alt={podcast.title} height={250} width={250}/>
            </div>
            <div className='flex flex-col w-full ml-5'>
                <p className='self-start font-medium text-[18px]'>{podcast.title}</p>
                <p className='self-start text-[14px] mb-2'>by {podcast.author}</p>
                <div className='flex gap-2 mb-2'>
                    {categoryNames.map((name, index) => (
                        <CategoryTab key={index} category={name}></CategoryTab>
                    ))}
                </div>
                <p className='self-start text-[14px] mb-5'>{podcast.description}</p>

                <Button className='shad-button_primary mt-auto mr-auto'>View Episodes</Button>
            </div>
        </div>
    )
}
export default SearchCard

export const SearchCardSkeleton = () => {
    return (
        <div className='flex justify-center rounded-md w-full py-3 mb-5'>
            <Skeleton className='h-[250px] w-[300px]'/>
            <div className='flex flex-col w-full ml-5'>
                <Skeleton className='h-[30px] w-[400px] mb-4'/>
                <Skeleton className='h-[30px] w-[400px] mb-4'/>
                <Skeleton className='h-[60px] w-full'/>
            </div>
        </div>
    )
}