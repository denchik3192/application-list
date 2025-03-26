"use client";
import Image from "next/image";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const menuItems = [
  { src: "/Book.svg", text: "База знаний", link: "/knowledgeBase" },
  { src: "/File.svg", text: "Заявки", link: "/applications" },
  { src: "/people.svg", text: "Сотрудники", link: "/employees" },
  { src: "/City.svg", text: "Клиенты", link: "/clients" },
  { src: "/analytics.svg", text: "Активы", link: "/assets" },
  { src: "/settings.svg", text: "Настройки", link: "/settings" },
];

function DashBoard() {
  const [activeItem, seActiveItem] = useState(0);
  return (
    <nav>
      <Box
        sx={{
          width: 100,
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
              onClick={() => seActiveItem(index)}
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
              <Link href={item.link} passHref>
                <Image src={item.src} width={24} height={25} alt={item.text} />
                <ListItemText
                  primary={item.text}
                  sx={{
                    fontSize: "12px",
                  }}
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
