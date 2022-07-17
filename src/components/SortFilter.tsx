import React from "react";
import { options } from "../services/SortCategories";

const SortFilter = ({ movies, setSearchFilterMovie, searching }) => {
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
    if (e === "NAME ASC") {
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (e === "NAME DESC") {
      sorted.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    setSearchFilterMovie(sorted);
  };

  return (
    <select
      className="p-2 border-2 border-border-gray-400"
      onChange={(e) => handleSortRating(e.target.value)}
    >
      {searching.length >= 1 ? (
        <option>Standardsortering</option>
      ) : (
        options.map((item) => (
          <option key={item.option} value={item.value}>
            {item.option}
          </option>
        ))
      )}
    </select>
  );
};

export default SortFilter;
