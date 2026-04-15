import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CATEGORIES_DATA } from "@/core/constants";

const hoverStyle = {
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff1744",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
  },
};

const MobileDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={open} onClose={onClose} ModalProps={{ disableScrollLock: true }}>
      <Box
        sx={{
          width: 250,
          height: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.05)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #ff1744, #ff9100)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "linear-gradient(180deg, #ff4569, #ffab40)",
          },
        }}
      >
        <Typography sx={{ p: 2, fontWeight: "bold" }}>
          Categories
        </Typography>

        <List>
          {CATEGORIES_DATA.map((cat) => (
            <Dropdown key={cat.name} category={cat} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

const Dropdown = ({ category }: any) => {
  const [open, setOpen] = useState(false);

  const hasItems = Array.isArray(category.items) && category.items.length > 0;
  const hasSections =
    Array.isArray(category.sections) && category.sections.length > 0;

  if (!hasItems && !hasSections) {
    return (
      <ListItem disablePadding>
        <ListItemButton sx={hoverStyle}>
          <ListItemText primary={category.name} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)} sx={hoverStyle}>
          <ListItemText primary={category.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} unmountOnExit>
        <List component="div" disablePadding>
          {hasSections
            ? category.sections.map((section: any) => (
                <SectionDropdown key={section.title} section={section} />
              ))
            : category.items.map((item: string) => (
                <ListItemButton key={item} sx={{ pl: 4 }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
        </List>
      </Collapse>
    </>
  );
};

const SectionDropdown = ({ section }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{ pl: 4, ...hoverStyle }}
      >
        <ListItemText
          primary={section.title}
          sx={{
            "& .MuiTypography-root": { fontSize: "0.95rem", fontWeight: 500 },
          }}
        />
        {open ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={open} unmountOnExit>
        <List component="div" disablePadding>
          {section.items.map((item: string) => (
            <ListItemButton key={item} sx={{ pl: 7 }}>
              <ListItemText
                primary={item}
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MobileDrawer;