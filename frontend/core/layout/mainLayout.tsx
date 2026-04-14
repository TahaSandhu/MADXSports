import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Navbar />
      <HeroCarousel />
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
