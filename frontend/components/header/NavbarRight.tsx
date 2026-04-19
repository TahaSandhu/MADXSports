import { useContext, useState } from "react";
import { Box, IconButton, Button, Menu, MenuItem, Badge } from "@mui/material";
import { ExpandMore, Login, Logout } from "@mui/icons-material";
import { CurrencyContext } from "@/core/context/CurrencyContext";
import { ThemeToggleContext } from "@/core/context/ThemeToggleContext";
import { useCart } from "@/core/context/CartContext";
import { useTheme } from "@mui/material/styles";
import { CURRENCY_DATA } from "@/core/constants";
import { useRouter } from "next/router";
import { useAuth } from "@/core/context/AuthContext";

const hoverStyle = {
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff1744",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
  },
};

const iconStyle = { fontSize: "0.9rem" };

const NavbarRight = ({
  onSearch,
  onCart,
}: {
  onSearch: () => void;
  onCart: () => void;
}) => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { totalItems } = useCart();
  const theme = useTheme();
  const router = useRouter();
  const colorMode = useContext(ThemeToggleContext);
  const { user, logout } = useAuth();

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleLogin = () => {
    router.push("/auth");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Button
        color="inherit"
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{ display: { xs: "none", sm: "flex" }, ...hoverStyle }}
      >
        {currency} <ExpandMore fontSize="small" />
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        disableScrollLock
      >
        {CURRENCY_DATA.map((cur) => (
          <MenuItem
            key={cur.code}
            onClick={() => {
              setCurrency(cur.code);
              setAnchor(null);
            }}
          >
            <Box component="span" sx={{ mr: 1 }}>
              {cur.flag}
            </Box>
            {cur.code}
          </MenuItem>
        ))}
      </Menu>

      <IconButton
        color="inherit"
        size="small"
        onClick={onSearch}
        sx={hoverStyle}
      >
        <i className="fa-solid fa-magnifying-glass" style={iconStyle}></i>
      </IconButton>

      <IconButton
        color="inherit"
        size="small"
        onClick={onCart}
        sx={hoverStyle}
      >
        <Badge badgeContent={totalItems} color="primary">
          <i className="fa-solid fa-cart-shopping" style={iconStyle}></i>
        </Badge>
      </IconButton>

      {user ? (
        <IconButton
          color="inherit"
          size="small"
          sx={{ display: { xs: "none", sm: "flex" }, ...hoverStyle }}
          onClick={handleLogout}
        >
          <Logout sx={iconStyle} />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          size="small"
          sx={{ display: { xs: "none", sm: "flex" }, ...hoverStyle }}
          onClick={handleLogin}
        >
          <Login sx={iconStyle} />
        </IconButton>
      )}

      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        size="small"
        sx={hoverStyle}
      >
        {theme.palette.mode === "dark" ? (
          <i className="fa-solid fa-sun" style={iconStyle}></i>
        ) : (
          <i className="fa-solid fa-moon" style={iconStyle}></i>
        )}
      </IconButton>
    </Box>
  );
};

export default NavbarRight;