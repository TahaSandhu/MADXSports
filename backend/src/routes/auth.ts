import { Router } from "express";
import {
  sendOtp,
  verifyOtp,
  googleAuth,
} from "../controller/authController";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/google", googleAuth);

export default router;