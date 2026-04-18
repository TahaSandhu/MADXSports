import dotenv from "dotenv";
import express from "express";
import type { Application } from "express";
import cors from "cors";
import productRoutes from "./routes/product";
import paymentRoutes from "./routes/payment";

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/api/v1", productRoutes);
app.use("/api/payment", paymentRoutes);
export default app;