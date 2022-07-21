import React, { useEffect, useState } from "react";
import Movie from "../interface/moviesInterface";
import StarIcon from "@mui/icons-material/Star";

const SingleMovie = (props: Movie) => {
  const { desc, genre, name, rating, thumb_url, year } = props;

  const [imgSrc, setImgSrc] = useState<string>(
    "https://via.placeholder.com/1000"
  );
  const [image, setImage] = useState<any>("");
  const customClass = imgSrc && image === imgSrc ? "img-loaded" : "img-loading";

  const shortDesc = desc.split(" ").slice(0, 20).join(" ");

  useEffect(() => {
    setImage(thumb_url);
  }, [thumb_url]);

  useEffect(() => {
    const img: any = new Image();
    img.src = image;
    img.onload = () => {
      setImgSrc(image);
    };
  }, [image]);

  return (
    <div className="w-full shadow-xl flex-1 bg-green-200">
      <img className={`w-full h-52 ${customClass}`} src={imgSrc} alt={name} />
      <div className="flex flex-col px-2 pt-4 pb-8 bg-green-200">
        <div className="flex flex-1 justify-between">
          <div className="text-base md:text-xl font-semibold">{name}</div>
          <div className="flex items-center ml-2">
            <StarIcon sx={{ color: "gold" }} />
            <div className="ml-1 font-semibold">{rating}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between my-2 text-xs italic">
          <div>{year}</div>
          <div className="flex items-center">
            {genre.map((genre, index) => (
              <span className="mt-1 md:mt-0 comma" key={index}>
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="text-sm md:text-base">{shortDesc}...</div>
      </div>
    </div>
  );
};

export default SingleMovie;
