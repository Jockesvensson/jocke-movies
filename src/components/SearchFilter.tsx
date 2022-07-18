import React, { useEffect, useState } from "react";
import Movie from "../interface/moviesInterface";
import CloseIcon from "@mui/icons-material/Close";

const SearchFilter = ({ movies, setSearchFilterMovie, setSearching }) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (typeof search === "string" && search.trim().length === 0) {
      setSearching([]);
    } else {
      setSearching(search);
    }

    searchFilter();
  }, [search]);

  const searchFilter = () => {
    if (!search) {
      setSearchFilterMovie(movies);
    } else {
      setSearchFilterMovie(
        movies.filter((movie: Movie) =>
          movie.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="relative flex w-full md:w-3/4">
      <input
        className="w-full px-4 py-2 border-2 border-gray-400"
        type="text"
        placeholder="Sök..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          searchFilter();
        }}
      />
      <CloseIcon
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        sx={{ fontSize: 30 }}
        onClick={() => setSearch("")}
      />
    </div>
  );
};

export default SearchFilter;
