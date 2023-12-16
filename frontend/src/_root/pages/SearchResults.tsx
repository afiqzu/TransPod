import {useParams} from "react-router-dom";
import {useSearchByTerm} from "@/lib/tanstack-query/queriesAndMutations.ts";
import {PodcastSearch} from "@/types";
import SearchCard, {SearchCardSkeleton} from "@/components/shared/SearchCard.tsx";

const SearchResults = () => {
    const {term} = useParams()
    const {data:podcasts, isPending} = useSearchByTerm(term)
    const numberOfSkeletons = 10

    return (
        <div className='max-w-6xl ml-auto mr-auto flex flex-col mt-10'>
            <p className='font-medium text-[24px] mb-8'>
                Search results for '{term}'
            </p>
            {isPending && Array.from({length: numberOfSkeletons}, (_, index) => (
            <SearchCardSkeleton key={index}/>
            ))}
            <ul>
                {podcasts?.map((podcast:PodcastSearch) => (
                    <SearchCard key={podcast.id} podcast={podcast}/>
                ))}
            </ul>
            <p className='font-medium text-xl self-center mb-10'>
                End of search results
            </p>
        </div>
    )
}
export default SearchResults
