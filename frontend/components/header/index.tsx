import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import SearchModal from "@/components/search/SearchModal";
import CartDrawer from "@/components/cart/CartDrawer";
import NavbarLeft from "./NavbarLeft";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";
import MobileDrawer from "./MobileDrawer";
import TrendingBar from "../trending-bar";
import { useAuth } from "@/core/context/AuthContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, token, isAdmin } = useAuth();
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            mx: "auto",
          }}
        >
          <NavbarLeft onMenuClick={() => setDrawerOpen(true)} />
           <NavbarCenter isAdmin={isAdmin} />
          <NavbarRight
            onSearch={() => setSearchOpen(true)}
            onCart={() => setCartOpen(true)}
          />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} isAdmin={isAdmin} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
