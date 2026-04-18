import { Router } from "express";
import { createPaymentIntent } from "../controller/paymentController";

const router = Router();

router.post("/create-payment-intent", createPaymentIntent);

export default router;