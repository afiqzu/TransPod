import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = () => {
  const navigate = useNavigate();
  const suggestions = [
    "News",
    "Comedy",
    "Education",
    "Health",
    "Culture",
    "History",
    "Documentary",
  ];

  const handleClick = (searchTerm: string) => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {suggestions.map((suggestion) => (
        <div
          onClick={() => handleClick(suggestion)}
          key={suggestion}
          className="flex cursor-pointer items-center gap-1 rounded-full border-[1px] border-light-3 px-2 py-1 text-[13px] font-light"
        >
          {suggestion}
          <ArrowUpRight size={15} />
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
