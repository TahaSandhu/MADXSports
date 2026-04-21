import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import api from "@/lib/api";

type EmailForm = { email: string };
type OtpForm = { otp: string };

export default function SignInPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogoClick = () => {
    router.push("/");
  };

  const emailForm = useForm<EmailForm>();
  const otpForm = useForm<OtpForm>();

  const sendOtp = async (data: EmailForm) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/send-otp", { email: data.email });
      setEmail(data.email);
      setStep("otp");
      emailForm.reset();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: OtpForm) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp: data.otp });
      if (res.data.user) {
        // router.push("/");
console.log("t1 response", res.data);
      };
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const handleBackToEmail = () => {
    setStep("email");
    setError(null);
    otpForm.reset();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #010101ff 0%, #030202ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundSize: "40px 40px",
          animation: "slide 20s linear infinite",
          "@keyframes slide": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(40px, 40px)" },
          },
        }}
      />

      <Zoom in timeout={500}>
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: "#1a1a1a",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,0,0,0.3)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #ff0000 0%, #8b0000 100%)",
              }}
            />

            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 140,
                  height: 100,
                  margin: "0 auto 16px",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src="/logoH.png"
                  alt="Logo"
                  sx={{cursor: "pointer", width: "100%", height: "100%",}}
                  onClick={handleLogoClick}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffffff" }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#b0b0b0" }}>
                Sign in to continue to your account
              </Typography>
            </Box>

            <Fade in={!!error}>
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: "rgba(255,0,0,0.1)",
                  color: "#ff4444",
                }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            </Fade>

            <Button
              fullWidth
              variant="outlined"
              onClick={googleLogin}
              sx={{
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                borderColor: "rgba(255,0,0,0.5)",
                color: "#ffffff",
                "&:hover": {
                  borderColor: "#ff0000",
                  backgroundColor: "rgba(255,0,0,0.1)",
                },
              }}
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </Button>

            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}>
              <Typography variant="caption" sx={{ color: "#b0b0b0" }}>
                OR
              </Typography>
            </Divider>

            <Fade in={step === "email"} unmountOnExit>
              <Box>
                <form onSubmit={emailForm.handleSubmit(sendOtp)}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...emailForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!emailForm.formState.errors.email}
                    helperText={emailForm.formState.errors.email?.message}
                    disabled={loading}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#ff4444" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#2a2a2a",
                        "& fieldset": { borderColor: "rgba(255,0,0,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,0,0,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#ff0000" },
                      },
                      "& .MuiInputLabel-root": { color: "#b0b0b0" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#ff4444" },
                      "& .MuiInputBase-input": { color: "#ffffff" },
                      "& .MuiFormHelperText-root": { color: "#ff4444" },
                    }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      background:
                        "linear-gradient(135deg, #ff0000 0%, #8b0000 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #cc0000 0%, #660000 100%)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </form>
              </Box>
            </Fade>

            <Fade in={step === "otp"} unmountOnExit>
              <Box>
                <IconButton
                  onClick={handleBackToEmail}
                  sx={{ mb: 2, color: "#ff4444" }}
                  disabled={loading}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{ mb: 2, textAlign: "center", color: "#b0b0b0" }}
                >
                  Enter the 6-digit code sent to{" "}
                  <strong style={{ color: "#ff4444" }}>{email}</strong>
                </Typography>
                <form onSubmit={otpForm.handleSubmit(verifyOtp)}>
                  <TextField
                    fullWidth
                    label="Verification Code"
                    {...otpForm.register("otp", {
                      required: "OTP is required",
                      minLength: { value: 6, message: "OTP must be 6 digits" },
                      maxLength: { value: 6, message: "OTP must be 6 digits" },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "OTP must contain only numbers",
                      },
                    })}
                    error={!!otpForm.formState.errors.otp}
                    helperText={otpForm.formState.errors.otp?.message}
                    disabled={loading}
                    slotProps={{
                      input: {
                        sx: {
                          letterSpacing: 4,
                          fontSize: "1.2rem",
                          textAlign: "center",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "#ff4444" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#2a2a2a",
                        "& fieldset": { borderColor: "rgba(255,0,0,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,0,0,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#ff0000" },
                      },
                      "& .MuiInputLabel-root": { color: "#b0b0b0" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#ff4444" },
                      "& .MuiInputBase-input": {
                        color: "#ffffff",
                        textAlign: "center",
                      },
                      "& .MuiFormHelperText-root": { color: "#ff4444" },
                    }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      background:
                        "linear-gradient(135deg, #ff0000 0%, #8b0000 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #cc0000 0%, #660000 100%)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                    ) : (
                      "Verify & Sign In"
                    )}
                  </Button>
                </form>
              </Box>
            </Fade>

            <Typography
              variant="caption"
              sx={{
                mt: 3,
                textAlign: "center",
                display: "block",
                color: "#b0b0b0",
              }}
            >
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Typography>
          </Paper>
        </Container>
      </Zoom>
    </Box>
  );
}
