import React, { useState } from 'react'
import Movie from '../interface/moviesInterface'
import StarIcon from '@mui/icons-material/Star';

const SingleMovie: React.FC<Movie> = ({
    desc,
    genre,
    name,
    rating,
    thumb_url,
    year
}) => {

    const shortDesc = desc.split(' ').slice(0, 20).join(' ');

    return (
        <div className="w-full shadow-xl flex-1 bg-green-200">
            <img className="w-full h-52" src={thumb_url} alt={name} />
            <div className="flex flex-col px-2 pt-4 pb-8 bg-green-200">
                <div className="flex flex-1 justify-between">
                    <div className="text-xl font-semibold">{name}</div>
                    <div className="flex items-center ml-2">
                        <StarIcon sx={{color: 'gold'}}/>
                        <div className="ml-1 font-semibold">{rating}</div>
                    </div>
                </div>
                <div className="flex justify-between my-2 text-xs italic">
                    <div>{year}</div>
                    <div className="flex items-center">
                    {genre.map((genre, index) => (
                        <span className="ml-1 comma" key={index}>{genre}</span>
                    ))}
                    </div>
                </div>
                <div>{shortDesc}...</div>
            </div>
        </div>
    )
}

export default SingleMovie