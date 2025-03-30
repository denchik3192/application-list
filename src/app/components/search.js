"use client";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

const searchStyles = {
  container: {
    marginLeft: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    width: "630px",

    background: "white",
    borderRadius: "50px",
    border: "1px solid #42aaff",
    padding: "0 10px",
  },
  inputBase: {
    display: "inline-block",
    borderRadius: "8px",
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    height: "36px",
  },
  icon: {
    color: "#42aaff",
    marginLeft: "10px",
  },
};

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={searchStyles.container}>
      <div style={searchStyles.inputWrapper}>
        <input
          style={searchStyles.inputBase}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchIcon style={searchStyles.icon} />
      </div>
    </div>
  );
}

export default Search;
