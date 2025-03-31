"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { TextField } from "@mui/material";
import AppButton from "./button";
import { Close } from "@mui/icons-material";
import EditPage from "./editPage";
import { postNewApplication } from "../API/postNewApplication";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "@/lib/slices/newApplicationSlice";

export default function TemporaryDrawer({ open, toggleDrawer, id }) {
  const [nameValue, setNameValue] = React.useState("");
  const [descriptionValue, setDescriptionValue] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const status = useSelector((state) => state.application.status);
  const applicationId = useSelector((state) => state.application.applicationId);
  const dispatch = useDispatch();

  console.log(status);
  console.log(applicationId);

  const handleSubmit = () => {
    dispatch(postData(nameValue, descriptionValue));
    setIsEdit(true);
  };
  React.useEffect(() => {
    if (status === "success" && applicationId) {
      setIsEdit(true);
    }
  }, [status, applicationId]);

  const DrawerList = (
    <>
      {!isEdit ? (
        <>
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
            <Box>Новая Заявка</Box>

            <Close
              onClick={toggleDrawer(false)}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              width: 1000,
              p: "35px",
              background: "#ecf3f7",
              height: "100%",
            }}
            role="presentation"
          >
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Box style={{ marginTop: "10px" }}>
                <Box sx={{ mb: "20px", color: "#9f9ea7" }}>Название</Box>
                <TextField
                  value={nameValue}
                  onChange={(e) => setNameValue(e.currentTarget.value)}
                  sx={{
                    border: "1px solid rgb(232, 232, 232)",
                    borderRadius: "5px",
                    backgroundColor: "rgb(249, 249, 250)",
                    width: "623px",
                    height: "83px",
                  }}
                  id="outlined-multiline-static"
                  multiline
                  rows={2.2}
                />
              </Box>
              <Box sx={{ mb: "10px", mt: "20px", color: "#9f9ea7" }}>
                Описание
              </Box>
              <Box style={{ marginTop: "10px" }}>
                <TextField
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.currentTarget.value)}
                  sx={{
                    border: "1px solid rgb(232, 232, 232)",
                    borderRadius: "5px",
                    backgroundColor: "rgb(249, 249, 250)",
                    width: "623px",
                    height: "132px",
                  }}
                  id="outlined-multiline-static"
                  multiline
                  rows={4.2}
                />
              </Box>
            </Box>

            <Box style={{ marginTop: "125px" }} onClick={handleSubmit}>
              <AppButton>Сохранить</AppButton>
            </Box>
          </Box>
        </>
      ) : (
        <EditPage
          nameValue={nameValue}
          descriptionValue={descriptionValue}
          applicationId={applicationId}
        />
      )}
    </>
  );

  return (
    <Box sx={{ overflowY: "auto" }}>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        ModalProps={{
          keepMounted: true,
          sx: {
            top: "70px",
          },
        }}
        PaperProps={{
          sx: { top: "70px", height: "calc(100% - 70px)" },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
