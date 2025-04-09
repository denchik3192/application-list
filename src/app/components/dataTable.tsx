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
import {
  fetchExecutorsData,
  fetchStatusesData,
} from "../../lib/slices/prioritiesSlice";
import { IApplication } from "../interfaces";
import { AppDispatch, RootState } from "@/lib/store";

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
    height: "100vh",
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
};
interface IRowData {
  id: number;
  name: string;
  status: React.ReactNode;
  executor: string;
  priorityId: number;
}

const createData = (
  id: number,
  name: string,
  status: React.ReactNode,
  executor: string,
  priorityId: number
): IRowData => ({
  id,
  name,
  status,
  executor,
  priorityId,
});

export default function DataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const applicationsData = useSelector(selectApplications);
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<number | null>(null);

  const priorities = useSelector(selectPriorities);
  const { executors, statuses } = useSelector(
    (state: RootState) => state.priorities
  );

  const toggleDrawer = (state: boolean, id: number) => () => {
    setActiveId(id);
    setOpen(state);
  };

  React.useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchPriorities());
    dispatch(fetchExecutorsData());
    dispatch(fetchStatusesData());
  }, [dispatch]);

  const rows = applicationsData?.map((row: IApplication) =>
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
      row.executorName,
      row.priorityId
    )
  );

  const formatId = (id: number) => {
    const idStr = id.toString();
    return `${idStr.slice(0, 2)} ${idStr.slice(2)}`;
  };

  return (
    <>
      <Box sx={{ marginTop: "20px", marginLeft: "200px" }}>
        <Button onClick={toggleDrawer(true, null)}>Создать заявку</Button>
        <Drawer open={open} onClose={toggleDrawer(false, null)} anchor="right">
          <ApplicationDrawer
            activeId={activeId}
            toggleDrawer={toggleDrawer}
            priorities={priorities}
            executors={executors}
            statuses={statuses}
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
                <TableCell sx={{ maxWidth: "300px" }} align="left">
                  Название
                </TableCell>
                <TableCell align="left">Статус</TableCell>
                <TableCell align="left">Исполнитель</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row: IRowData) => (
                <TableRow
                  key={row.id}
                  sx={styles.rowHover}
                  onClick={toggleDrawer(true, row.id)}
                >
                  <TableCell align="left" sx={styles.idCell}>
                    <Box
                      sx={{
                        position: "absolute",
                        left: 2,
                        top: 3,
                        width: 5,
                        height: "90%",
                        borderRadius: "4px",
                        backgroundColor: priorities?.find(
                          (p: IRowData) => p.id === row.priorityId
                        )?.rgb,
                      }}
                    />

                    {formatId(row.id)}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    align="left"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ maxWidth: "50px" }} align="left">
                    {row.status}
                  </TableCell>
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
