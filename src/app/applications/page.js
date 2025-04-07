"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../components/dataTable";
import TemporaryDrawer from "../components/drawer";
import { Box } from "@mui/material";
import AppButton from "../components/button";
import StoreProvider from "../storeProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchPriorities } from "@/lib/slices/prioritiesSlice";
import { selectPriorities } from "@/lib/selectors/selectApplications";

function Applications() {
  return (
    <>
      <StoreProvider>
        <DataTable />;
      </StoreProvider>
    </>
  );
}

export default Applications;
