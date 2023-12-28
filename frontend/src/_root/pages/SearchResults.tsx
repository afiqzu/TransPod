import { useParams } from "react-router-dom";
import { useSearchByTerm } from "@/lib/tanstack-query/queriesAndMutations.ts";
import { PodcastSearch } from "@/types";
import SearchCard, {
  SearchCardSkeleton,
} from "@/components/shared/SearchCard.tsx";

const SearchResults = () => {
  const { term } = useParams();
  const { data: podcasts, isPending } = useSearchByTerm(term);
  const numberOfSkeletons = 10;

  return (
    <div className="ml-auto mr-auto flex max-w-6xl flex-col px-2 sm:px-4">
      <p className="my-3 text-[18px] font-medium sm:my-5 sm:text-[24px]">
        Showing results for '{term}'
      </p>
      {isPending &&
        Array.from({ length: numberOfSkeletons }, (_, index) => (
          <SearchCardSkeleton key={index} />
        ))}
      <ul>
        {podcasts?.map((podcast: PodcastSearch) => (
          <SearchCard key={podcast.id} podcast={podcast} />
        ))}
      </ul>
    </div>
  );
};
export default SearchResults;
