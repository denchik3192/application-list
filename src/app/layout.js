import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { Dashboard } from "@mui/icons-material";
import DashBoard from "./components/dashBoard";
import { Box } from "@mui/material";
import StoreProvider from "./storeProvider";
import { store } from "../lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Box style={{ display: "flex", height: "100vh" }}>
          <DashBoard />
          <Box sx={{ flexGrow: 1 }}>
            <Header />
            <StoreProvider store={store}> {children}</StoreProvider>
          </Box>
        </Box>
      </body>
    </html>
  );
}
