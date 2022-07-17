import React from 'react'
import StarIcon from "@mui/icons-material/Star";

const BigStar = ({newRating}) => {
    return (
        <>
            <StarIcon
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-blueish"
          sx={{ fontSize: 120 }}
        />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl font-bold text-white">
            {newRating + 1}
        </div>
        </>
    )
}

export default BigStar