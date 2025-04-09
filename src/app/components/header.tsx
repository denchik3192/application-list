import React, { CSSProperties, JSX } from "react";
import Search from "./search";

const headerStyles: CSSProperties = {
  background: "#d1e0ed",
  height: "66px",
  display: "flex",
  alignItems: "center",
};

export default function Header(): JSX.Element {
  return (
    <header style={headerStyles}>
      <Search />
    </header>
  );
}
