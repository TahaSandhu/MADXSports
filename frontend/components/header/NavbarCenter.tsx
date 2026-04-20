"use client";

import { Box, Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, useRef } from "react";
import { CATEGORIES_DATA } from "@/core/constants";
import { useAuth } from "@/core/context/AuthContext";
import { useRouter } from "next/navigation";

type Category = {
  name: string;
  url?: string;
  items?: string[];
  sections?: {
    title: string;
    items: string[];
  }[];
};

const hoverStyle = {
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff1744",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
  },
};

const NavbarCenter = () => {
  const { isAdmin } = useAuth();
  const router = useRouter();

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
      {CATEGORIES_DATA.map((cat: Category) =>
        cat.items || cat.sections ? (
          <Dropdown key={cat.name} category={cat} />
        ) : (
          <SimpleButton key={cat.name} name={cat.name} url={cat.url} />
        )
      )}

      {isAdmin && (
        <Button
          sx={{
            color: "#ff1744",
            fontWeight: "bold",
          }}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </Button>
      )}
    </Box>
  );
};

const Dropdown = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!category.sections && !category.items) return null;

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  const sectionsToRender = category.sections
    ? category.sections
    : category.items
    ? [{ title: category.name, items: category.items }]
    : [];

  return (
    <>
      {/* Button */}
      <Box onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Button color="inherit" endIcon={<ExpandMore />} sx={hoverStyle}>
          {category.name}
        </Button>
      </Box>

      {/* Dropdown */}
      <Box
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        sx={{
          position: "fixed",
          top: 65,
          left: 0,
          width: "100%",
          bgcolor: "#0f0d0d",
          color: "#fff",
          py: 5,
          zIndex: 1200,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <Box
          sx={{
            maxWidth: 1300,
            mx: "auto",
            px: 4,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 6,
          }}
        >
          {sectionsToRender.map((sec) => (
            <Box key={sec.title}>
              <Box sx={{ fontWeight: "bold", mb: 1.5, color: "#ff1744" }}>
                {sec.title}
              </Box>

              {sec.items.map((item) => (
                <Box
                  key={item}
                  sx={{
                    fontSize: "0.85rem",
                    mb: 0.7,
                    cursor: "pointer",
                    "&:hover": { color: "#ff1744" },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

const SimpleButton = ({
  name,
  url,
}: {
  name: string;
  url?: string;
}) => {
  const router = useRouter();

  return (
    <Button
      color="inherit"
      sx={hoverStyle}
      onClick={() => {
        if (url) router.push(url);
      }}
    >
      {name}
    </Button>
  );
};

export default NavbarCenter;