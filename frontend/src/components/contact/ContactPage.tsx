import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();
  const theme = useTheme();

const onSubmit = async (data: ContactFormData) => {
  try {
    const res = await fetch("https://formspree.io/f/xrenrvyp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Message sent successfully!");
      reset();
    } else {
      toast.error("Failed to send message.");
    }
  } catch (error) {
    toast.error("Something went wrong.");
  }
};

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", py: 8, minHeight: "80vh" }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "#ff1744", fontWeight: "bold", tracking: 1.5 }}>
            GET IN TOUCH
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "black", mt: 1, mb: 2 }}>
            Contact Our Team
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Have questions about products, sizing, bulk orders, or custom gear? Reach out to our offices in the UK or Pakistan.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Left Side: Contact Information Cards */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              {/* UK Office Info Card */}
              <Card sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255, 23, 68, 0.15)", borderRadius: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2.5, p: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 23, 68, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <LocationOnIcon sx={{ color: "#ff1744" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5, color: "#fff" }}>
                      UK Office Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      246 Beechwood Road, Luton, UK
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Telephone Office Card */}
              <Card sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255, 23, 68, 0.15)", borderRadius: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2.5, p: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 23, 68, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <PhoneIcon sx={{ color: "#ff1744" }} />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}>
                      Phone Numbers
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>UK Office No:</strong>{" "}
                      <Button
                        component="a"
                        href="tel:00447480396846"
                        sx={{
                          p: 0,
                          minWidth: 0,
                          color: "#ff1744",
                          textTransform: "none",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                          verticalAlign: "baseline",
                        }}
                      >
                        0044 7480396846
                      </Button>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Pakistan Office No:</strong>{" "}
                      <Button
                        component="a"
                        href="tel:00923341450990"
                        sx={{
                          p: 0,
                          minWidth: 0,
                          color: "#ff1744",
                          textTransform: "none",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                          verticalAlign: "baseline",
                        }}
                      >
                        +92 334 1450990
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card sx={{ bgcolor: "#0a0a0a", border: "1px solid rgba(255, 23, 68, 0.15)", borderRadius: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2.5, p: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 23, 68, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <EmailIcon sx={{ color: "#ff1744" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5, color: "#fff" }}>
                      Email Address
                    </Typography>
                    <Button
                      component="a"
                      href="mailto:hassan@madxsports.com"
                      sx={{
                        p: 0,
                        minWidth: 0,
                        color: "#ff1744",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                      }}
                    >
                      hassan@madxsports.com
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Side: Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                bgcolor: "#0a0a0a",
                border: "1px solid rgba(255, 23, 68, 0.15)",
                borderRadius: 4,
                p: { xs: 3, md: 5 },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}>
                Send Us a Message
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      required
                      {...register("name")}
                      slotProps={{
                        input: { sx: { color: "#fff" } },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                          "&.Mui-focused fieldset": { borderColor: "#ff1744 !important" },
                        },
                        "& .MuiInputLabel-root": { color: "text.secondary" },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      required
                      {...register("email")}
                      slotProps={{
                        input: { sx: { color: "#fff" } },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                          "&.Mui-focused fieldset": { borderColor: "#ff1744 !important" },
                        },
                        "& .MuiInputLabel-root": { color: "text.secondary" },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      required
                      {...register("subject")}
                      slotProps={{
                        input: { sx: { color: "#fff" } },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                          "&.Mui-focused fieldset": { borderColor: "#ff1744 !important" },
                        },
                        "& .MuiInputLabel-root": { color: "text.secondary" },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={5}
                      variant="outlined"
                      required
                      {...register("message")}
                      slotProps={{
                        input: { sx: { color: "#fff" } },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                          "&.Mui-focused fieldset": { borderColor: "#ff1744 !important" },
                        },
                        "& .MuiInputLabel-root": { color: "text.secondary" },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        bgcolor: "#ff1744",
                        fontWeight: "bold",
                        height: 48,
                        px: 4,
                        "&:hover": { bgcolor: "black", color: "#ff1744", border: "1px solid #ff1744" },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
