import { Close } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import React from "react";
import AppButton from "./button";

function EditPage({ nameValue, descriptionValue }) {
  return (
    <>
      <Box>
        {" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "35px",
            paddingRight: "35px",
            height: "70px",
            background: "#1a4876",
            color: "white",
          }}
        >
          <Box>{nameValue}</Box>

          <Close
            //    onClick={toggleDrawer(false)}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            width: "975px",
            p: "35px",
            background: "#ecf3f7",
            height: "100%",
          }}
          role="presentation"
        >
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box style={{ marginTop: "10px" }}>
              <Box sx={{ mb: "20px", color: "#9f9ea7" }}>Описание</Box>
              <p>{descriptionValue}</p>
            </Box>
            <Box sx={{ mb: "10px", mt: "20px", color: "#9f9ea7" }}>
              Описание
            </Box>
            <Box style={{ marginTop: "10px" }}>Добавление комментария</Box>
          </Box>
          <AppButton>Сохранить</AppButton>
        </Box>
      </Box>
    </>
  );
}

export default EditPage;
