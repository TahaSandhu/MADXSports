import dotenv from "dotenv";
import express from "express";
import type { Application } from "express";
import cors from "cors";
import productRoutes from "./routes/product";
import paymentRoutes from "./routes/payment";
import authRoutes from "./routes/auth";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/api/v1", productRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/auth", authRoutes);
export default app;
