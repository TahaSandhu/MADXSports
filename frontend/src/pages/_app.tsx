"use client";
import { useState, useMemo } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/core/layout/mainLayout";
import DashboardLayout from "@/core/layout/dashboardLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeToggleContext } from "@/core/context/ThemeToggleContext";
import { CurrencyProvider } from "@/core/context/CurrencyContext";
import { CartProvider } from "@/core/context/CartContext";
import { AuthProvider } from "@/core/context/AuthContext";
import './index.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary: { main: "#ff1744" },
                background: { default: "#000000", paper: "#111111" },
              }
            : {
                primary: { main: "#d32f2f" },
                background: { default: "#fff5f5", paper: "#ffffff" },
              }),
        },
      }),
    [mode]
  );

  const getLayout = Component.getLayout ?? ((page: ReactElement) => {
    if (router.pathname.startsWith("/dashboard")) {
      return <DashboardLayout>{page}</DashboardLayout>;
    }
    return <MainLayout>{page}</MainLayout>;
  });

  return (
    <AuthProvider>
      <ThemeToggleContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CurrencyProvider>
            <CartProvider>
               <Toaster position="top-right" />
              {getLayout(<Component {...pageProps} />)}
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </AuthProvider>
  );
}