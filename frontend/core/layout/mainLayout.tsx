import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";
import WhatsAppButton from "@/components/whats-app";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isDetailProductRoute = pathname?.startsWith("/product-detail/");

  return (
    <Box>
      <Navbar />
      {!isDetailProductRoute && <HeroCarousel key={pathname} />}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <WhatsAppButton phoneNumber="+447480396846" message="Hi, I need help!" />
      <Footer />
    </Box>
  );
}
