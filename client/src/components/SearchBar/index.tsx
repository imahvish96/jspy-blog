import React from "react";
import { SearchIcon } from "../../icons";

const SearchBar = () => {
  return (
    <div>
      <div className="relative w-full">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search..."
        />
        <div className="text-slate-500 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
