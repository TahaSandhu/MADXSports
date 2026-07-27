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
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import Link from "next/link";

type SignInForm = {
  username: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const handleLogoClick = () => {
    router.push("/");
  };

const onSubmit = async (data: SignInForm) => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
    email: data.username,
    password: data.password,
  }),
});

console.log("Status:", res.status);

const result = await res.json();

console.log("Response:", result);
    if (!res.ok) {
      setError(result.message || "Invalid email or password.");
      setLoading(false);
      return;
    }

    // Save token
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    // Save user (optional)
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    router.push("/");
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
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
                  sx={{ cursor: "pointer", width: "100%", height: "100%" }}
                  onClick={handleLogoClick}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffffff" }}
              >
                Welcome Back
              </Typography>

              <Link href="/auth/signup" style={{ marginTop: 1, color: "#b0b0b0", cursor: "pointer" }}>
                Sign up if you don't have an account
              </Link>
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

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="Username"
                autoComplete="username"
                {...register("username", {
                  required: "Username is required",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled={loading}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#ff4444" }} />
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

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={loading}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#ff4444" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: "#b0b0b0" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
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
                  "Sign In"
                )}
              </Button>
            </form>

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