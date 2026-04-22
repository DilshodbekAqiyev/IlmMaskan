"use client";
import "./globals.css";
import "../utils/i18n";
// import { Poppins } from "next/font/google";
// import { Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, { FC, useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-Poppins",
// });

// const josefin = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-Josefin",
// });

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/Poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Poppins/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-Poppins",
});

const josefin = localFont({
  src: [
    {
      path: "./fonts/Josefin_Sans/JosefinSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/Josefin_Sans/JosefinSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>
                <div>{children}</div>
              </Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return <>{isLoading ? <Loader /> : <div>{children}</div>}</>;
};
