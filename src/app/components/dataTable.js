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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/lib/slices/applicationsSlice";
import { selectApplications } from "@/lib/selectors/selectApplications";
import TemporaryDrawer from "./drawer";

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

export default function DataTable({ toggleDrawer }) {
  const dispatch = useDispatch();
  const applicationsData = useSelector(selectApplications);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchData());
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
    <TableContainer component={Paper} sx={styles.container}>
      <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
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
                onClick={toggleDrawer(true)}
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
  );
}
