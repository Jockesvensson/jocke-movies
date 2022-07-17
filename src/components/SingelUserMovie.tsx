import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { deleteUserMovie } from "../services/Database";
import EditMovie from "./EditMovie";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";

const SingelUserMovie = ({ movies }) => {
  const [display, setDisplay] = useState<string>("notdisplayed");
  const [blurImage, setBlurImage] = useState<string>("noblur");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageToHover, setImageToHover] = useState<any>("");
  const [movie, setMovie] = useState<any[]>([]);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [searchFilterMovie, setSearchFilterMovie] = useState<any[]>([]);
  const [Searching, setSearching] = useState<any[]>([]);

  useEffect(() => {
    setSearchFilterMovie(movies);
  }, [movies]);

  const showButtons = (index) => {
    setIsHovered(true);
    setImageToHover(index);
    setDisplay("displayed");
    setBlurImage("blur");
  };

  const hideButtons = () => {
    setIsHovered(false);
    setImageToHover("");
    setDisplay("notdisplayed");
    setBlurImage("noblur");
  };

  const handleChange = (movie) => {
    setMovie(movie);
    setShowEditMovie(true);
  };

  const handleDelete = (id) => {
    deleteUserMovie(id);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8">
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
        <div className="grid grid-cols-6 gap-4">
          {searchFilterMovie.map((movie, index) => (
            <div key={index}>
              <div className="relative">
                <img
                  className={
                    index === imageToHover ? `w-full ${blurImage}` : `w-full`
                  }
                  src={movie.thumb_url}
                  alt={movie.name}
                  onMouseEnter={() => showButtons(index)}
                  onMouseLeave={() => hideButtons()}
                />
                <button
                  className={
                    index === imageToHover
                      ? `absolute top-0 left-1/2 -translate-x-1/2 w-full px-4 py-2 flex justify-center bg-teal-200 ${display}`
                      : `notdisplayed`
                  }
                  onMouseEnter={() => showButtons(index)}
                  onMouseLeave={() => hideButtons()}
                  onClick={() => handleChange(movie)}
                >
                  Ändra
                </button>
                <button
                  className={
                    index === imageToHover
                      ? `absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 py-2 flex justify-center bg-teal-200 ${display}`
                      : `notdisplayed`
                  }
                  onMouseEnter={() => showButtons(index)}
                  onMouseLeave={() => hideButtons()}
                  onClick={() => handleDelete(movie.id)}
                >
                  Ta bort
                </button>
              </div>
              <div className="p-2 border-2 border-green-200 bg-green-200 flex flex-col">
                <div>{movie.name}</div>
                <div className="italic">{movie.uploaded}</div>
                <div className="flex items-center justify-end">
                  <StarOutlineIcon sx={{ color: "rgb(87, 153, 239)" }} />
                  <div className="font-semibold">{movie.newRating}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEditMovie && (
        <EditMovie movie={movie} setShowEditMovie={setShowEditMovie} />
      )}
    </>
  );
};

export default SingelUserMovie;
