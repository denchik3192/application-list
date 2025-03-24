"use client";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          width: "630px",
          background: "white",
          borderRadius: "50px",
          border: "1px solid #42aaff",
          px: "20px",
          marginLeft: "auto",
        }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default Search;
