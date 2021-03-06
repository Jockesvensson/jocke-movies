import React, { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import SearchFilter from "../components/SearchFilter";
import Movie from "../interface/moviesInterface";

const Startpage = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    // fetch(`${process.env.REACT_APP_API_URL}`)
    fetch("https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json")
      .then((response) => response.json())
      .then((res) => setMovies(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <>
      <MoviesList movies={movies} loading={loading}/>
    </>
  );
};

export default Startpage;
