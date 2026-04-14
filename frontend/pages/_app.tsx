import React, { useState, useMemo } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import MainLayout from '@/core/layout/mainLayout';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeToggleContext } from '@/core/context/ThemeToggleContext';
import { CurrencyProvider } from '@/core/context/CurrencyContext';
import { CartProvider } from '@/core/context/CartContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                primary: { main: '#ff1744' }, // Vibrant, energetic red
                background: { default: '#000000', paper: '#111111' },
              }
            : {
                primary: { main: '#d32f2f' }, // strong red for light mode visibility
                background: { default: '#fff5f5', paper: '#ffffff' },
              }),
        },
      }),
    [mode],
  );

  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <ThemeToggleContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CurrencyProvider>
          <CartProvider>
            {getLayout(<Component {...pageProps} />)}
          </CartProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
