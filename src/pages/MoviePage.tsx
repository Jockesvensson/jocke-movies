import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddMovie from "../components/AddMovie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/Auth";
import { getUserMovies } from "../services/Database";

const MoviePage = () => {
  const { state } = useLocation();
  const { movie }: any = state;
  const navigate = useNavigate();
  const [showAddMovie, setShowAddMovie] = useState<boolean>(false);
  const [user, loading] = useAuthState(auth);
  const [movies, setMovies] = useState<any[]>([]);
  const [imgSrc, setImgSrc] = useState<string>(
    "https://via.placeholder.com/1500"
  );
  const [image, setImage] = useState<any>("");
  const customClass = imgSrc && image === imgSrc ? "img-loaded" : "img-loading";

  useEffect(() => {
    if (loading) return;
    getUserMovies(user, setMovies);
    setImage(movie.image_url);
  }, [user, loading, movie.image_url]);

  useEffect(() => {
    const img: any = new Image();
    img.src = image;
    img.onload = () => {
      setImgSrc(image);
    };
  }, [image]);

  const addMovie = () => {
    setShowAddMovie(true);
  };

  const mapMovieList = movies.filter((item) =>
    item.name.toLowerCase().includes(movie.name.toLowerCase())
  );
  const userRating = mapMovieList.map((item) => item.newRating);

  return (
    <>
      <div className="relative max-w-6xl sm:h-screen mx-auto pt-20 px-4 bg-gray-200">
        <div className="mb-4 mt-14 sm:mb-4 sm:mt-4">
          <ArrowBackIcon
            sx={{ fontSize: 50, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
            <div>
            <img className={`h-auto w-full object-contain self-center sm:h-img-height ${customClass}`} src={imgSrc} alt={movie.name} />
            </div>
            <div className="relative flex flex-col mb-8 sm:mb-0">
              <div className="flex flex-col xsm:flex-row justify-between">
                <div className="w-3/4 sm:w-full text-2xl md:text-3xl lg:text-4xl font-semibold">{movie.name}</div>
                <div className="flex flex-row xsm:flex-col lg:flex-row mt-4 xsm:ml-4 xsm:mt-0 justify-between xsm:justify-center">
                  <div className="flex flex-col items-center mr-4 mb-4 lg:mb-0">
                    <div className="font-semibold text-center">IMDb betyg</div>
                    <div className="flex">
                      <StarIcon sx={{ fontSize: 30, color: "gold" }} />
                      <div className="text-xl font-semibold">
                        {movie.rating}/10
                      </div>
                    </div>
                  </div>
                  {user?.email ? (
                    <div className="flex flex-col items-center">
                      <div className="font-semibold">Ditt betyg</div>
                      <div
                        className={
                          mapMovieList.length > 0
                            ? "flex"
                            : "flex cursor-pointer"
                        }
                        onClick={() =>
                          mapMovieList.length > 0 ? "" : addMovie()
                        }
                      >
                        <StarOutlineIcon
                          sx={{ fontSize: 30, color: "rgb(87, 153, 239)" }}
                        />
                        <div className="text-xl font-semibold">
                          {mapMovieList.length > 0 ? (
                            <div>{userRating}</div>
                          ) : (
                            <div>Betygsätt</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col my-2">
                <div className="font-semibold">År</div>
                <div>{movie.year}</div>
              </div>
              <div className="flex flex-col my-2">
                <div className="font-semibold">Genre</div>
                <div className="flex flex-col xsm:flex-row">
                  {movie.genre.map((genre, index) => (
                    <span className="comma" key={index}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-2xl">Skådespelare</div>
              <div className="flex flex-col xsm:flex-row">
                {movie.actors.map((actor, index) => (
                  <span className="comma" key={index}>
                    {actor}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-2xl">Regissör</div>
              <div className="flex flex-col xsm:flex-row">
                {movie.directors.map((director, index) => (
                  <span className="mr-2 comma" key={index}>
                    {director}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-2xl">Handling</div>
              <div>{movie.desc}</div>
              <div className="flex mt-10">
                <div
                  className="underline cursor-pointer"
                  onClick={() =>
                    window.open("https://imdb.com" + movie.imdb_url)
                  }
                >
                  {"https://imdb.com" + movie.imdb_url}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddMovie && (
        <AddMovie {...movie} setShowAddMovie={setShowAddMovie} />
      )}
    </>
  );
};

export default MoviePage;
