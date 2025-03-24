import Image from "next/image";
import React from "react";

function DashBoard() {
  return (
    <nav style={{ background: "#002137", width: "93px", color: "#778994" }}>
      <Image src={"/logo.png"} width={150} height={50} alt="logo" />
    </nav>
  );
}

export default DashBoard;
