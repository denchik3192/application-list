import React from "react";
import Search from "./search";

const headerStyles = {
  background: "#d1e0ed",
  height: "70px",
  display: "flex",
  alignItems: "center",
};

export default function Header() {
  return (
    <header style={headerStyles}>
      <Search />
    </header>
  );
}
