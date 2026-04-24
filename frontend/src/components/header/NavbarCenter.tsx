"use client";

import { Box, Button, Tooltip } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, useRef } from "react";
import { CATEGORIES_DATA } from "@/core/constants";
import { useRouter } from "next/router";

type Category = {
  name: string;
  url?: string;
  items?: string[];
  sections?: {
    title: string;
    url?: string;
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

const NavbarCenter = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();

  const filteredCategories = CATEGORIES_DATA.filter(
    (cat) => cat.name !== "Dashboard"
  );

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
      {filteredCategories.map((cat: Category) =>
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
  const router = useRouter();

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
    ? [{ title: category.name, items: category.items, url: category.url }]
    : [];

  return (
    <>
      {/* Button */}
      <Box onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Button
          color="inherit"
          endIcon={<ExpandMore />}
          sx={hoverStyle}
          onClick={() => {
            if (category.url) {
              router.push(category.url);
              setOpen(false);
            }
          }}
        >
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
              <Box
                sx={{
                  fontWeight: "bold",
                  mb: 1.5,
                  color: "#ff1744",
                  cursor: sec.url ? "pointer" : "default",
                }}
                onClick={() => {
                  if (sec.url) {
                    router.push(sec.url);
                    setOpen(false);
                  }
                }}
              >
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
                  onClick={() => {
                    const url = sec.url || category.url;
                    if (url) {
                      router.push(`${url}?filter=${encodeURIComponent(item)}`);
                      setOpen(false);
                    }
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