import React, { useState } from "react";

export const options = [
    {
        value: "",
        option: "Standard sortering"
    },
    {
        value: "DESC",
        option: "Högst betyg först"
    },
    {
        value: "ASC",
        option: "Lägst betyg först"
    }
]

const SortFilter = ({ movies, setSearchFilterMovie, Searching }) => {

  const handleSortRating = (e) => {

    const sorted = [...movies];
    if (e === "DESC") {
      sorted.sort((a, b) => b.rating - a.rating);
      sorted.sort((a, b) => b.newRating - a.newRating);
    }
    if (e === "ASC") {
      sorted.sort((a, b) => a.rating - b.rating);
      sorted.sort((a, b) => a.newRating - b.newRating);
    }
    setSearchFilterMovie(sorted);
  };

  return (
    <select
      className="p-2 border-2 border-border-gray-400"
      onChange={(e) => handleSortRating(e.target.value)}
    >
      {Searching.length >= 1 ? (
        <option>Standard sortering</option>
      ) : (
        options.map(item => (
            <option key={item.option} value={item.value}>{item.option}</option>
          ))
      )}
      
    </select>
  );
};

export default SortFilter;
