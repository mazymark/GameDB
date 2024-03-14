import React from "react";
import { useContext } from "react";
import { Context } from "../App";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(Context);
  return (
    <input
      className="search-bar"
      placeholder="Search for games"
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
