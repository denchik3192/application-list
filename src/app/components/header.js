import React from "react";
import Search from "./search";

export default function Header() {
  return (
    <header
      style={{
        background: "#d1e0ed",
        height: "70px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Search />
    </header>
  );
}
