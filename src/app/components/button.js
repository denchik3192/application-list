"use client";
import { Button } from "@mui/material";
import React from "react";

export default function AppButton({ children, toggleDrawer }) {
  return (
    <Button
      variant="contained"
      // onClick={toggleDrawer(true)}
      sx={{
        borderRadius: "50px",
        padding: "5px 20px",
        backgroundColor: "#008cf0",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#115293",
        },
      }}
    >
      {children}
    </Button>
  );
}
