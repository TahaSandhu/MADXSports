import { Box, Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, useRef } from "react";
import { CATEGORIES_DATA } from "@/core/constants";

const hoverStyle = {
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff1744",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
  },
};

const NavbarCenter = () => {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
      {CATEGORIES_DATA.map((cat) =>
        cat.items || cat.sections ? (
          <Dropdown key={cat.name} category={cat} />
        ) : (
          <SimpleButton key={cat.name} name={cat.name} />
        )
      )}
    </Box>
  );
};

const Dropdown = ({ category }: any) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!category.sections && !category.items) return null;

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const sectionsToRender = category.sections
    ? category.sections
    : category.items
    ? [{ title: category.name, items: category.items }]
    : [];

  return (
    <>
      <Box onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Button color="inherit" endIcon={<ExpandMore />} sx={hoverStyle}>
          {category.name}
        </Button>
      </Box>

      <Box
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        sx={{
          position: "fixed",
          top: 68,
          left: 0,
          width: "100%",
          bgcolor: "#f5f5f5",
          color: "#000",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
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
          {sectionsToRender.map((sec: any) => (
            <Box key={sec.title}>
              <Box sx={{ fontWeight: "bold", mb: 1.5 }}>
                {sec.title}
              </Box>

              {sec.items?.map((item: string) => (
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

const SimpleButton = ({ name }: { name: string }) => {
  return (
    <Button color="inherit" sx={hoverStyle}>
      {name}
    </Button>
  );
};

export default NavbarCenter;