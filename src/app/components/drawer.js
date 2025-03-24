import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { TextField } from "@mui/material";
import AppButton from "./button";
import { Padding } from "@mui/icons-material";

export default function TemporaryDrawer({ open, toggleDrawer }) {
  const DrawerList = (
    <>
      {" "}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          height: "70px",
          background: "#1a4876",
          color: "white",
        }}
      >
        Новая Заявка
      </Box>
      <Box
        sx={{ width: 1000, p: "20px", background: "#ecf3f7", height: "100%" }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <Box style={{ marginTop: "10px" }}>
            <TextField
              id="outlined-multiline-static"
              label="Название"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </Box>
          <Box style={{ marginTop: "10px" }}>
            <TextField
              id="outlined-multiline-static"
              label="Название"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </Box>
        </Box>

        <Box style={{ marginTop: "40px" }}>
          <AppButton>Сохранить</AppButton>
        </Box>
      </Box>
    </>
  );

  return (
    <Box>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
}
