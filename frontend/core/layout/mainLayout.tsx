import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";
import { UNPROTECTED_ROUTES } from "../routes";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const isDetailProductRoute = UNPROTECTED_ROUTES.includes(pathname);

  return (
    <Box>
      <Navbar />
      {isDetailProductRoute && <HeroCarousel />}
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}