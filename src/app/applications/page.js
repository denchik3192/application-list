"use client";
import React, { useState } from "react";
import DataTable from "../components/dataTable";
import TemporaryDrawer from "../components/drawer";
import { Box } from "@mui/material";
import AppButton from "../components/button";
import StoreProvider from "../storeProvider";

function Applications() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <StoreProvider>
        <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} id={id} />
        <Box sx={{ marginTop: "20px", marginLeft: "200px" }}>
          <AppButton toggleDrawer={toggleDrawer}>Создать заявку</AppButton>
        </Box>
        <DataTable toggleDrawer={toggleDrawer} />;
      </StoreProvider>
    </>
  );
}

export default Applications;
