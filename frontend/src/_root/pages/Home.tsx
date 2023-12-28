import TrendingGrid from "@/components/shared/TrendingGrid.tsx";
import { useInView } from "react-intersection-observer";
import { SearchField } from "@/components/shared/SearchField.tsx";
import SearchSuggestions from "@/components/shared/SearchSuggestions.tsx";

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <div className="ml-auto mr-auto flex flex-col items-center bg-white">
      <div className="flex h-[700px] w-3/4 flex-col items-center justify-center gap-5 px-4">
        <div className="w-full max-w-4xl">
          <SearchField inTopbar={false}/>
        </div>
        <SearchSuggestions />
      </div>
      <div className="flex h-max w-full flex-col pt-10">
        <div
          ref={ref}
          className={`transition-opacity duration-1000 ${
            inView ? "animate-fadein opacity-100" : "opacity-0"
          }`}
        >
          <TrendingGrid />
        </div>
      </div>
    </div>
  );
};
export default Home;
