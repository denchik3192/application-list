import { Close } from "@mui/icons-material";
import {
  Badge,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppButton from "./button";

function EditPage({ nameValue, descriptionValue }) {
  const [statuses, setStatuses] = useState(null);
  const [activeStatus, setActiveStatus] = useState("В работе");
  const [executors, setExecutors] = useState(null);
  const [activeExecutor, setActiveExecutor] = useState("");

  console.log(executors);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://intravision-task.test01.intravision.ru/api/83f41211-5a40-48bb-b294-1f6656ea3a33/Statuses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();

        setStatuses(json);
        return json;
      } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
      }
    };

    const fetchExecutors = async () => {
      const response = await fetch(
        "http://intravision-task.test01.intravision.ru/api/83f41211-5a40-48bb-b294-1f6656ea3a33/Users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setActiveExecutor(json[0].name);
      setExecutors(json);
    };
    fetchApplications();
    fetchExecutors();
  }, []);

  const handleChange = (e) => {
    setActiveStatus(e.target.value);
  };

  return (
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
          <Box>№ {nameValue}</Box>

          <Close
            //    onClick={toggleDrawer(false)}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "975px",
            pl: "35px",
            background: "#ecf3f7",
            height: "100%",
            display: "flex",
          }}
          role="presentation"
        >
          <Box>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Box style={{ marginTop: "10px" }}>
                <Box sx={{ mb: "20px", color: "#9f9ea7" }}>Описание</Box>
                <p>{descriptionValue}</p>
              </Box>
              <Box sx={{ mb: "10px", mt: "20px", color: "#9f9ea7" }}>
                Описание
              </Box>
              <Box sx={{ mt: "10px", mb: "84px" }}>Добавление комментариев</Box>
            </Box>
            <AppButton>Сохранить</AppButton>

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
            <FormControl fullWidth sx={{ mb: "48px" }}>
              <InputLabel id="status-select-label">Статус</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={activeStatus || ""}
                label="status"
                onChange={handleChange}
                sx={{ display: "flex" }}
              >
                {statuses?.map((status) => (
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
                    <Box>{status.name}</Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: "14px" }}>Заявитель</Box>
            <Box sx={{ mb: "34px" }}>Александр вознесенко</Box>
            <Box sx={{ mb: "14px" }}>Создана</Box>
            <Box sx={{ mb: "34px" }}>Маркова Анна</Box>
            <Box sx={{ mb: "14px" }}>Исполнитель</Box>

            {/* <Box sx={{ color: "blue", cursor: "pointer", mb: "34px" }}>
              {activeExecutor || ""}
            </Box> */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Исполнитель</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={executors[0]?.name || ""}
                label="executor"
                // onChange={handleChange}
              >
                {executors?.map((executor) => (
                  <MenuItem value={executor.name} key={executor.id}>
                    {executor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: "14px" }}>Приоретет</Box>
            <Box sx={{ mb: "34px" }}>Высокий</Box>
            <Box sx={{ mb: "14px" }}>Срок</Box>
            <Box sx={{ mb: "34px" }}>12.11.2018г</Box>
            <Box sx={{ mb: "14px" }}>Тэги</Box>
            <Chip
              sx={{
                mb: "5px",
                background: "white",
                height: "18px",
                color: "grey",
              }}
              variant="outlined"
              label="Сервер 1"
            />

            <Chip
              sx={{ background: "white", height: "18px", color: "grey" }}
              variant="outlined"
              label="mb_support_mymersedes"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditPage;
