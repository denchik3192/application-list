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
    marginTop: "4px",
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
    // width: "120px",
    paddingLeft: "48px",
    fontSize: "16px",
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
  }, [dispatch, applicationsData]);

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
      <Box sx={{ marginTop: "24px", marginLeft: "260px" }}>
        <Button
          onClick={toggleDrawer(true, null)}
          variant="contained"
          sx={{
            width: "180px",
            borderRadius: "50px",
            textTransform: "none",
            backgroundColor: "#008cf0",
            fontWeight: "200",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Создать заявку
        </Button>
        <Box
          sx={{
            position: "fixed",
            top: "66px",
            right: open ? 0 : "-975px",
            width: "975px",
            height: "100vh",
            boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.25)",
            overflowY: "auto",
            transition: "right 0.3s ease-in-out",
            zIndex: 999,
          }}
        >
          <ApplicationDrawer
            open={open}
            setOpen={setOpen}
            activeId={activeId}
            toggleDrawer={toggleDrawer}
            priorities={priorities}
            executors={executors}
            statuses={statuses}
          />
        </Box>
      </Box>
      <TableContainer component={Paper} sx={styles.container}>
        {!applicationsData ? (
          <Box sx={styles.overlay}>
            <CircularProgress sx={styles.progress} />
          </Box>
        ) : (
          <Table
            stickyHeader
            sx={{ width: "100%", minWidth: 1000, tableLayout: "fixed" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ paddingLeft: "50px", fontSize: "18px", width: "116px" }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: "18px", width: "420px" }}
                >
                  Название
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: "18px", width: "115px" }}
                >
                  Статус
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  Исполнитель
                </TableCell>
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
                      maxWidth: "70px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "16px",
                    }}
                    align="left"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left" sx={{ fontSize: "16px" }}>
                    {row.executor}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}
