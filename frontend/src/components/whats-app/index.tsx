"use client";

import React from "react";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface Props {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppTooltipButton({
  phoneNumber,
  message = "Hello! I need help.",
}: Props) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Tooltip
      title="Need help? Click to chat with us on WhatsApp"
      arrow
      placement="left"
    >
      <Fab
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#25D366",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1ebe5d",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
        }}
        aria-label="whatsapp"
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
}