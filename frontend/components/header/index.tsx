import { useContext, useState } from "react";
import { CurrencyContext } from "@/core/context/CurrencyContext";
import { ThemeToggleContext } from "@/core/context/ThemeToggleContext";
import { useCart } from "@/core/context/CartContext";
import { CATEGORIES_DATA } from "@/core/constants";
import { useTheme } from "@mui/material/styles";
import SearchModal from "@/components/search/SearchModal";
import CartDrawer from "@/components/cart/CartDrawer";
import { Badge } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, ExpandLess, ExpandMore } from "@mui/icons-material";

const hoverStyle = {
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff1744",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
  },
};

const DesktopDropdown = ({
  category,
}: {
  category: { name: string; items: string[] };
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ExpandMore />}
        sx={hoverStyle}
      >
        {category.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {category.items.map((item) => (
          <MenuItem key={item} onClick={() => setAnchorEl(null)} sx={hoverStyle}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MobileDropdown = ({
  category,
}: {
  category: { name: string; items: string[] };
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)} sx={hoverStyle}>
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: "medium" }}>
                {category.name}
              </Typography>
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.items.map((item) => (
            <ListItemButton key={item} sx={{ pl: 4, ...hoverStyle }}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { totalItems } = useCart();
  const [currencyAnchor, setCurrencyAnchor] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const colorMode = useContext(ThemeToggleContext);

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: "rgba(0,0,0,0.1)", // Very slight tint
        backdropFilter: "blur(8px)", // Premium glassmorphism
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: 1280,
          width: "100%",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexBasis: { xs: "auto", md: "25%" },
          }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={hoverStyle}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            component="img"
            src="/logoH.jpeg"
            alt="MADXSports Logo"
            sx={{
              height: 40,
              width: "auto",
              cursor: "pointer",
            }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            gap: 2,
          }}
        >
          {CATEGORIES_DATA.map((cat) => (
            <DesktopDropdown key={cat.name} category={cat} />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexBasis: { xs: "auto", md: "25%" },
            gap: 0.5,
          }}
        >
          <Button
            color="inherit"
            onClick={(e) => setCurrencyAnchor(e.currentTarget)}
            sx={{ display: { xs: "none", sm: "flex" }, ...hoverStyle }}
          >
            {currency} <ExpandMore fontSize="small" />
          </Button>
          <Menu
            anchorEl={currencyAnchor}
            open={Boolean(currencyAnchor)}
            onClose={() => setCurrencyAnchor(null)}
          >
            {[
              { code: "USD", flag: "🇺🇸" },
              { code: "EUR", flag: "🇪🇺" },
              { code: "GBP", flag: "🇬🇧" },
              { code: "CAD", flag: "🇨🇦" },
              { code: "PKR", flag: "🇵🇰" },
            ].map((cur) => (
              <MenuItem
                key={cur.code}
                onClick={() => {
                  setCurrency(cur.code);
                  setCurrencyAnchor(null);
                }}
                sx={hoverStyle}
              >
                <Box component="span" sx={{ mr: 1 }}>{cur.flag}</Box> {cur.code}
              </MenuItem>
            ))}
          </Menu>

          <IconButton color="inherit" size="small" sx={hoverStyle} onClick={() => setSearchOpen(true)}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "0.9rem" }}></i>
          </IconButton>

          <IconButton color="inherit" size="small" sx={hoverStyle} onClick={() => setCartOpen(true)}>
            <Badge badgeContent={totalItems} color="primary">
              <i className="fa-solid fa-cart-shopping" style={{ fontSize: "0.9rem" }}></i>
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            size="small"
            sx={{ display: { xs: "none", sm: "flex" }, ...hoverStyle }}
          >
            <i className="fa-solid fa-user" style={{ fontSize: "0.9rem" }}></i>
          </IconButton>

          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            size="small"
            sx={hoverStyle}
          >
            {theme.palette.mode === "dark" ? (
              <i className="fa-solid fa-sun" style={{ fontSize: "0.9rem" }}></i>
            ) : (
              <i className="fa-solid fa-moon" style={{ fontSize: "0.9rem" }}></i>
            )}
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 250 }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
              Categories
            </Typography>
            <List>
              {CATEGORIES_DATA.map((cat) => (
                <MobileDropdown key={cat.name} category={cat} />
              ))}
            </List>
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                mt: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Settings
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton sx={hoverStyle}>
                    <i className="fa-solid fa-user" style={{ marginRight: "16px", width: "20px" }}></i>
                    <ListItemText primary="Account Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => setCurrencyAnchor(e.currentTarget)}
                    sx={hoverStyle}
                  >
                    <ListItemText primary={`Currency: ${currency}`} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </AppBar>
  );
};

export default Navbar;