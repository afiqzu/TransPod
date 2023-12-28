import { Button } from "@/components/ui/button.tsx";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = () => {
  const navigate = useNavigate();
  const suggestions = ["News", "Comedy", "Education", "Health"];

  const handleClick = (searchTerm: string) => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex gap-3">
      {suggestions.map((suggestion) => (
        <Button
          onClick={() => handleClick(suggestion)}
          key={suggestion}
          className="rounded-full border-2 border-dark-4 p-2 text-sm font-light opacity-70"
        >
          {suggestion}
          <ArrowUpRight />
        </Button>
      ))}
    </div>
  );
};

export default SearchSuggestions;
