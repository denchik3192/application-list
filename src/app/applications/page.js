"use client";
import React, { useState } from "react";
import DataTable from "../components/dataTable";
import TemporaryDrawer from "../components/drawer";
import { Box } from "@mui/material";
import AppButton from "../components/button";

function Applications() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box sx={{ marginTop: "20px", marginLeft: "200px" }}>
        <AppButton toggleDrawer={toggleDrawer}>Создать заявку</AppButton>
      </Box>
      <DataTable />;
    </>
  );
}

export default Applications;
