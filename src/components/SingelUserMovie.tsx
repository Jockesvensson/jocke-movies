import React, { useEffect, useState } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { deleteUserMovie } from "../services/Database";
import EditMovie from "./EditMovie";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";
import SortDateFilter from "./SortDateFilter";
import StatisticsInformation from "./StatisticsInformation";

const SingelUserMovie = ({ movies }) => {
  const [display, setDisplay] = useState<string>("notdisplayed");
  const [blurImage, setBlurImage] = useState<string>("noblur");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageToHover, setImageToHover] = useState<any>("");
  const [movie, setMovie] = useState<any[]>([]);
  const [showEditMovie, setShowEditMovie] = useState<boolean>(false);
  const [searchFilterMovie, setSearchFilterMovie] = useState<any[]>([]);
  const [searching, setSearching] = useState<any[]>([]);

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
      <div className="relative max-w-6xl mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row mb-6 mt-36 sm:mt-6">
          <SearchFilter
            movies={movies}
            setSearchFilterMovie={setSearchFilterMovie}
            setSearching={setSearching}
          />
          <div className="flex flex-col xsm:flex-row md:w-1/2 md:justify-end mt-4 md:mt-0">
            <div className="flex flex-col xsm:items-end mb-4 xsm:mb-0 md:ml-4 xsm:mr-3">
                <SortFilter
                movies={movies}
                setSearchFilterMovie={setSearchFilterMovie}
                searching={searching}
                />
            </div>
            <div className="flex flex-col xsm:items-end">
                <SortDateFilter
                movies={movies}
                setSearchFilterMovie={setSearchFilterMovie}
                searching={searching}
                />
            </div>
          </div>
        </div>
        <StatisticsInformation movies={movies}/>
        <div className="flex flex-col xsm:grid xsm:grid-cols-2 small:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              <div className="relative flex flex-col h-28 xsm:h-36 p-2 border-2 border-green-200 bg-green-200">
                <div>{movie.name}</div>
                <div className="italic">{movie.uploaded}</div>
                <div className="absolute bottom-2 right-2 flex items-center justify-end">
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
