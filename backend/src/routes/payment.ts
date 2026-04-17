import { Router } from "express";
import { createCheckoutSession } from "../controller/paymentController";

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;