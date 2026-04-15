import { Box, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/router";

const hoverStyle = {
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff1744",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
  },
};

const NavbarLeft = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
        <IconButton size="small" onClick={onMenuClick} sx={hoverStyle}>
          <MenuIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        component="img"
        src="/logoH.png"
        alt="Logo"
        sx={{ height: 60, cursor: "pointer" }}
        onClick={handleLogoClick}
      />
    </Box>
  );
};

export default NavbarLeft;
