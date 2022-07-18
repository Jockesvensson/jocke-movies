import React, { useEffect, useState } from "react";
import Movie from "../interface/moviesInterface";
import SingleMovie from "./SingleMovie";
import { useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MoviesList = ({ movies, loading }) => {
  const [searchFilterMovie, setSearchFilterMovie] = useState<any[]>([]);
  const [searching, setSearching] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClick = (movie: Movie) => {
    navigate(`/Movie/${movie.name}`, { state: { movie } });
  };

  useEffect(() => {
    setSearchFilterMovie(movies);
  }, [movies]);

  const navigateToStart = () => {
    document
      .getElementById("navbar")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-36 sm:mt-24 mb-12 px-4">
      <div className="flex flex-col md:flex-row my-6">
        <SearchFilter
          movies={movies}
          setSearchFilterMovie={setSearchFilterMovie}
          setSearching={setSearching}
        />
        <div className="flex mt-4 md:mt-0 md:flex-col md:items-end md:w-1/4">
          <SortFilter
            movies={movies}
            setSearchFilterMovie={setSearchFilterMovie}
            searching={searching}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {searchFilterMovie.map((movie: Movie) => (
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => handleClick(movie)}
            key={movie.name}
          >
            <SingleMovie {...movie} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-10 right-4 p-2 bg-black rounded-full">
        <KeyboardArrowUpIcon
          sx={{ fontSize: 30, cursor: "pointer", color: "white" }}
          onClick={() => navigateToStart()}
        />
      </div>
    </div>
  );
};

export default MoviesList;
