"use client";

import styles from "./page.module.css";
import AppButton from "./components/button";
import DataTable from "./components/dataTable";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import TemporaryDrawer from "./components/drawer";
import DashBoard from "./components/dashBoard";

export default function Home() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <div className={styles.page}>
      <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
      <AppButton toggleDrawer={toggleDrawer}>Создать заявку</AppButton>

      <main className={styles.main}>
        <DataTable />
      </main>
    </div>
  );
}
