import React from "react";
import { options } from "../services/SortCategoriesDate";

const SortDateFilter = ({ movies, setSearchFilterMovie, searching }) => {

  const handleSortDate = (e) => {
    const sorted = [...movies];
    if (e === "DESC") {
      sorted.sort((a, b) => (a.uploaded > b.uploaded ? 1 : -1));
    }
    if (e === "ASC") {
      sorted.sort((a, b) => (a.uploaded < b.uploaded ? 1 : -1));
    }
    setSearchFilterMovie(sorted);
  };

  return (
    <select
      className="p-2 border-2 border-border-gray-400"
      onChange={(e) => handleSortDate(e.target.value)}
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

export default SortDateFilter;
