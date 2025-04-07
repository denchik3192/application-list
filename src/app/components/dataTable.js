"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  CircularProgress,
  Button,
  Drawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/lib/slices/applicationsSlice";
import {
  selectApplications,
  selectPriorities,
} from "@/lib/selectors/selectApplications";
import TemporaryDrawer from "./drawer";
import AppButton from "./button";
import ApplicationDrawer from "./drawer";
import { fetchPriorities } from "@/lib/slices/prioritiesSlice";

const styles = {
  container: {
    minWidth: 650,
    height: "80vh",
    overflowY: "auto",
    marginTop: "10px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    opacity: 0.5,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: { color: "white" },
  rowHover: { "&:hover": { backgroundColor: "#e9e9e9" } },
  idCell: {
    position: "relative",
    width: "150px",
    paddingLeft: "40px",
  },
  idIndicator: {
    position: "absolute",
    left: 2,
    top: 3,
    width: 5,
    height: "90%",
    backgroundColor: "pink",
    borderRadius: "4px",
  },
};

const createData = (id, name, status, executor) => ({
  id,
  name,
  status,
  executor,
});

export default function DataTable() {
  const dispatch = useDispatch();
  const applicationsData = useSelector(selectApplications);
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState(null);
  const priorities = useSelector(selectPriorities);
  console.log(priorities);

  const toggleDrawer = (state, id) => () => {
    setActiveId(id);
    setOpen(state);
  };

  React.useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchPriorities());
  }, [dispatch]);

  const rows = applicationsData?.map((row) =>
    createData(
      row.id,
      row.name,
      <Chip
        label={row.statusName}
        sx={{
          backgroundColor: row.statusRgb,
          color: "white",
          fontSize: "12px",
          height: "22px",
        }}
      />,
      row.executorName
    )
  );

  const formatId = (id) => {
    const idStr = id.toString();
    return `${idStr.slice(0, 2)} ${idStr.slice(2)}`;
  };

  return (
    <>
      <Box sx={{ marginTop: "20px", marginLeft: "200px" }}>
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <ApplicationDrawer
            activeId={activeId}
            toggleDrawer={toggleDrawer}
            priorities={priorities}
          />
        </Drawer>
      </Box>
      <TableContainer component={Paper} sx={styles.container}>
        {!applicationsData ? (
          <Box sx={styles.overlay}>
            <CircularProgress sx={styles.progress} />
          </Box>
        ) : (
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ paddingLeft: "40px" }}>
                  ID
                </TableCell>
                <TableCell align="left">Название</TableCell>
                <TableCell align="left">Статус</TableCell>
                <TableCell align="left">Исполнитель</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={styles.rowHover}
                  onClick={toggleDrawer(true, row.id)}
                >
                  <TableCell align="left" sx={styles.idCell}>
                    <div style={styles.idIndicator} />
                    {formatId(row.id)}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">{row.executor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}
