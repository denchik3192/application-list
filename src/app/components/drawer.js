"use client";

import Box from "@mui/material/Box";
import {
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AppButton from "./button";
import { Close } from "@mui/icons-material";
import { postNewApplication } from "../API/postNewApplication";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "@/lib/slices/newApplicationSlice";
import { useEffect, useState } from "react";
import { getApplication } from "../API/getApplication";

import { convertDate } from "@/helpers/convertDate";

export default function TemporaryDrawer({
  activeId,
  toggleDrawer,
  priorities,
  executors,
  statuses,
}) {
  const [application, setApplication] = useState(null);
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const status = useSelector((state) => state.application.status);
  const [activeStatus, setActiveStatus] = useState("");
  const [activeExecutor, setActiveExecutor] = useState("");
  const [activePriority, setActivePriority] = useState("");

  useEffect(() => {
    if (activeId) {
      const getData = async () => {
        setIsLoading(true);
        const result = await getApplication(activeId);
        setApplication(result);
        setIsLoading(false);
      };
      getData();
    }
  }, [activeId]);

  useEffect(() => {
    if (application) {
      setActiveStatus(application.statusName);
      setActiveExecutor(application.executorName || executors.data[0].name);
      setActivePriority(application.priorityName || priorities[0].name);
    }
  }, [application, executors.data, priorities]);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    // dispatch(postData(nameValue, descriptionValue));
    setIsEdit(true);
  };

  useEffect(() => {
    if (status === "success" && activeId) {
      setIsEdit(true);
    }
  }, [status, activeId]);

  const saveApplication = () => {};

  const DrawerList = (
    <>
      {!isEdit && !activeId ? (
        <Box>
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
              height: "100vh",
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
        </Box>
      ) : (
        <>
          <Box>
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
              {isLoading ? (
                "Загрузка..."
              ) : (
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ mr: "20px" }}>№{activeId}</Box>
                  <Box>{application?.name || ""}</Box>
                </Box>
              )}

              <Close
                style={{ cursor: "pointer" }}
                onClick={toggleDrawer(false)}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "975px",
                pl: "35px",
                background: "#ecf3f7",
                height: "100vh",
                display: "flex",
              }}
              role="presentation"
            >
              <Box>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box style={{ marginTop: "10px" }}>
                    <Box sx={{ mb: "20px", color: "#9f9ea7" }}>Описание</Box>
                    <p>{application?.description}</p>
                  </Box>
                  <Box sx={{ mb: "10px", mt: "20px", color: "#9f9ea7" }}>
                    Описание
                  </Box>
                  <Box sx={{ mt: "10px", mb: "84px" }}>
                    Добавление комментариев
                  </Box>
                </Box>
                <AppButton onClick={saveApplication}>Сохранить</AppButton>

                <Box sx={{ display: "flex", mt: "44px" }}>
                  <Box
                    sx={{
                      border: "solid 1px rgb(197, 205, 211)",
                      borderRadius: "50%",
                      backgroundColor: "rgb(245, 245, 245)",
                      width: "38px",
                      height: "38px",
                    }}
                  ></Box>
                  <Box sx={{ ml: "12px" }}>
                    <Box>Иванов Александр</Box>
                    <Box
                      sx={{
                        mt: "14px",
                        fontSize: "12px",
                        fontFamily: "CorporateACyr",
                        color: "rgb(99, 103, 124)",
                      }}
                    >
                      12 августа,10:00 прокоментировал
                    </Box>
                    <Box
                      sx={{
                        marginTop: "18px",
                        borderRadius: "5px",
                        backgroundColor: "rgb(227, 233, 244)",
                        boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.2)",
                        width: "620px",
                        height: "100px",
                        padding: "10px 60px 20px 10px",
                        overflow: "hidden",
                      }}
                    >
                      {descriptionValue}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  borderLeft: "1px solid rgb(215, 220, 224)",
                  p: "30px",
                  flex: " 1",
                }}
              >
                <FormControl fullWidth sx={{ mb: "48px" }} size="small">
                  <InputLabel id="status-select-label">Статус</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={activeStatus}
                    label="статус"
                    onChange={(e) => setActiveStatus(e.target.value)}
                    sx={{ maxWidth: "100%" }}
                  >
                    {statuses?.data.map((status) => (
                      <MenuItem
                        value={status.name}
                        key={status.id}
                        sx={{ display: "flex" }}
                      >
                        <Chip
                          sx={{
                            backgroundColor: status.rgb || "transparent",
                            width: "14px",
                            height: "14px",
                            mr: "10px",
                          }}
                        />
                        {status.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mb: "14px" }}>Заявитель</Box>
                <Box sx={{ mb: "34px" }}>Александр вознесенко</Box>
                <Box sx={{ mb: "14px" }}>Создана</Box>
                <Box sx={{ mb: "34px" }}>{application?.initiatorName}</Box>

                <FormControl fullWidth size="small" sx={{ mb: "30px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Исполнитель
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={activeExecutor}
                    label="Исполнитель"
                    onChange={(e) => setActiveExecutor(e.target.value)}
                  >
                    {executors?.data?.map((executor) => (
                      <MenuItem value={executor.name} key={executor.id}>
                        {executor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mb: "34px" }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Приоретет
                    </InputLabel>
                    <Select
                      label="Приоретет"
                      value={activePriority}
                      sx={{
                        width: "100%",
                      }}
                      onChange={(e) => setActivePriority(e.target.value)}
                    >
                      {priorities.map((priority) => (
                        <MenuItem
                          key={priority.id}
                          value={priority.name}
                          sx={{ position: `relative` }}
                        >
                          <Chip
                            sx={{
                              backgroundColor: priority.rgb,
                              width: "16px",
                              height: "16px",
                              mr: "10px",
                            }}
                          />
                          {priority.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: "14px" }}>Срок</Box>
                <Box sx={{ mb: "34px" }}>
                  {convertDate(application?.resolutionDatePlan)}г.
                </Box>
                <Box sx={{ mb: "14px" }}>Тэги</Box>

                {application?.tags.map((tag) => (
                  <Box key={tag.id}>
                    <Chip
                      sx={{
                        mb: "5px",
                        background: "white",
                        height: "18px",
                        color: "grey",
                      }}
                      variant="outlined"
                      label={tag.name}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );

  return <Box sx={{ overflowY: "auto" }}>{DrawerList}</Box>;
}
