import React, { useEffect, useState } from "react";
import Movie from "../interface/moviesInterface";
import SingleMovie from "./SingleMovie";
import { useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";

const MoviesList = ({ movies }) => {
  const [searchFilterMovie, setSearchFilterMovie] = useState<any[]>([]);
  const [Searching, setSearching] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClick = (movie: Movie) => {
    navigate(`/Movie/${movie.name}`, { state: { movie } });
  };

  useEffect(() => {
    setSearchFilterMovie(movies);
  }, [movies]);

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <div className="flex my-6">
        <SearchFilter
          movies={movies}
          setSearchFilterMovie={setSearchFilterMovie}
          setSearching={setSearching}
        />
        <div className="flex flex-col items-end w-1/4">
          <SortFilter
            movies={movies}
            setSearchFilterMovie={setSearchFilterMovie}
            Searching={Searching}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
};

export default MoviesList;
