"use client";

import { Box, Typography, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { name: "Overview", path: "/dashboard" },
  { name: "Orders", path: "/dashboard/orders" },
  { 
    name: "Products", 
    path: "/dashboard/products",
    subItems: [
      { name: "All Products", path: "/dashboard/products" },
      { name: "Create Product", path: "/dashboard/products/create" },
    ]
  },
  { name: "Customers", path: "/dashboard/customers" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [productsOpen, setProductsOpen] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/signin');
//     }
//   }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#000" }}>
      <Box
        sx={{
          width: 240,
          bgcolor: "#0d0d0d",
          borderRight: "1px solid #1f1f1f",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ff1744",
            fontWeight: "bold",
            mb: 3,
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
            MADX Sports
        </Typography>

        <List>
          {menuItems.map((item) => (
            <Box key={item.name}>
              {item.subItems ? (
                <>
                  <ListItemButton
                    onClick={() => setProductsOpen(!productsOpen)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      color: "#ccc",
                      "&:hover": {
                        bgcolor: "rgba(255, 23, 68, 0.1)",
                        color: "#ff1744",
                      },
                    }}
                  >
                    <ListItemText primary={item.name} />
                    {productsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.name}
                          onClick={() => router.push(subItem.path)}
                          sx={{
                            pl: 4,
                            borderRadius: 2,
                            mb: 1,
                            color: "#999",
                            "&:hover": {
                              bgcolor: "rgba(255, 23, 68, 0.05)",
                              color: "#ff1744",
                            },
                          }}
                        >
                          <ListItemText primary={subItem.name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    color: "#ccc",
                    "&:hover": {
                      bgcolor: "rgba(255, 23, 68, 0.1)",
                      color: "#ff1744",
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              )}
            </Box>
          ))}
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: "#f44336",
              "&:hover": {
                bgcolor: "rgba(244, 67, 54, 0.1)",
              },
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            height: 64,
            bgcolor: "#0d0d0d",
            borderBottom: "1px solid #1f1f1f",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 500 }}>
            E-commerce Dashboard
          </Typography>
          <Typography sx={{ color: "#ff1744", fontSize: 14 }}>
            Admin
          </Typography>
        </Box>

        <Box sx={{ p: 3, bgcolor: "#000", flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}