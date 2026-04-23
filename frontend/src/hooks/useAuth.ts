import { useState } from "react";
import { useAuth } from "@/core/context/AuthContext";
import api from "@/lib/api";
import toast from "react-hot-toast";

export const useSendOtp = () => {
  const [loading, setLoading] = useState(false);

  const sendOtp = async (email: string) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/send-otp", { email });

      toast.success("OTP sent successfully");
      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to send OTP";
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendOtp, loading };
};

export const useVerifyOtp = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (email: string, otp: string) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", { email, otp });

      const { user, token } = res.data;

      login(user, token);

      toast.success("Login successful");

      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Invalid OTP";
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading };
};