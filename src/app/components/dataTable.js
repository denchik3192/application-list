"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import SimpleBackdrop from "./backDrop";

function createData(id, name, status, executor, statusRgb, statusName) {
  return { id, name, status, executor, statusRgb, statusName };
}

export default function DataTable() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  console.log(data?.value);

  const rows = data?.value.map((row) =>
    createData(
      row.id,
      row.name,
      <Chip
        label={`${row.statusName}`}
        sx={{ backgroundColor: `${row.statusRgb}`, color: "white" }}
      />,
      row.executorName
    )
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=83f41211-5a40-48bb-b294-1f6656ea3a33"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <SimpleBackdrop />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Название </TableCell>
              <TableCell align="left">Статус</TableCell>
              <TableCell align="left">Исполнитель</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 1,
                      top: 2,
                      width: "5px",
                      height: "95%",
                      backgroundColor: "pink",
                    }}
                  />
                  {row.id}
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
