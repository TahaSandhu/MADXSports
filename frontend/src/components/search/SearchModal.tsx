import React from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

interface SearchFormData {
  query: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  const { register, handleSubmit, reset } = useForm<SearchFormData>();
  const router = useRouter();

  const onSubmit = (data: SearchFormData) => {
    if (data.query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(data.query.trim())}`);
    }
    onClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        },
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
            bgcolor: "background.paper",
            boxShadow: 24,
            backgroundImage: "none",
          },
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
        },
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              autoFocus
              variant="outlined"
              placeholder="Search products, categories..."
              {...register("query")}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fa-solid fa-magnifying-glass" style={{ color: "#ff1744" }}></i>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "divider",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff1744 !important",
                    },
                  },
                },
              }}
            />
            <IconButton 
              onClick={onClose} 
              sx={{ 
                color: "text.secondary",
                "&:hover": { color: "#ff1744" }
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </IconButton>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
