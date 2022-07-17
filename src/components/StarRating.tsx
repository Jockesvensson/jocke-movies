import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const StarRating = ({ newRating, setNewRating, setShowBigStar, showBigStar }) => {
  const starArr = Array(10).fill(1);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [starToHover, setStarToHover] = useState<any>("");
  const [starToclick, setStarToclick] = useState<any>("");

  const fillStars = (index) => {
    setIsHovered(true);
    setStarToHover(index);
    setStarToclick("");
  };

  const emptyStars = () => {
    setIsHovered(false);
    setStarToHover("");
    if (showBigStar) {
      setStarToclick(newRating);
    }
  };

  const handleFillStars = (index) => {
    setShowBigStar(true);
    setStarToclick(index);
    setNewRating(index);
  };

  return (
    <>
      {starArr.map((item, index) => (
        <div key={index}>
          {index === starToHover || index === starToclick ? (
            <StarIcon
              className="text-blueish cursor-pointer"
              sx={{ fontSize: 30 }}
              onMouseEnter={() => fillStars(index)}
              onMouseLeave={() => emptyStars()}
              onClick={() => handleFillStars(index)}
            />
          ) : (
            <StarOutlineIcon
              className="text-blueish cursor-pointer"
              sx={{ fontSize: 30 }}
              onMouseEnter={() => fillStars(index)}
              onMouseLeave={() => emptyStars()}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default StarRating;
