"use client";
import Image from "next/image";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

interface IMenuItems {
  src: string;
  text: string;
  link: string;
}

const menuItems: IMenuItems[] = [
  { src: "/Book.svg", text: "База знаний", link: "/" },
  { src: "/File.svg", text: "Заявки", link: "/applications" },
  { src: "/people.svg", text: "Сотрудники", link: "/employees" },
  { src: "/City.svg", text: "Клиенты", link: "/clients" },
  { src: "/analytics.svg", text: "Активы", link: "/assets" },
  { src: "/settings.svg", text: "Настройки", link: "/settings" },
];

function DashBoard() {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <nav>
      <Box
        sx={{
          width: 96,
          height: "100vh",
          backgroundColor: "#002137",
          color: "#778994",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            padding: 2,
            textAlign: "center",
          }}
        >
          <Image src="/logo.svg" width={52} height={44} alt="logo" priority />
        </Box>

        <List sx={{ padding: "0" }}>
          {menuItems.map((item, index) => (
            <ListItem
              onClick={() => setActiveItem(index)}
              key={index}
              sx={{
                padding: "10px 0 10px 0",
                backgroundColor: `${activeItem === index ? "#002c49" : null}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#002c49" },
              }}
            >
              <Link
                href={item.link}
                passHref
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#778994",
                }}
              >
                <Image src={item.src} width={25} height={25} alt={item.text} />
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "white",
                        fontWeight: "200",
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </nav>
  );
}

export default DashBoard;
