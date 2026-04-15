import { Box, Button, Menu, MenuItem } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";
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
        cat.items ? (
          <Dropdown key={cat.name} category={cat} />
        ) : (
          <SimpleButton key={cat.name} name={cat.name} />
        )
      )}
    </Box>
  );
};

const Dropdown = ({ category }: any) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button
        color="inherit"
        onClick={(e) => setAnchor(e.currentTarget)}
        endIcon={<ExpandMore />}
        sx={hoverStyle}
      >
        {category.name}
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        disableScrollLock
      >
        {category.items.map((item: string) => (
          <MenuItem
            key={item}
            onClick={() => setAnchor(null)}
            sx={hoverStyle}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
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