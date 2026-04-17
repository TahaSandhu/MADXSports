import dotenv from "dotenv";
import express from "express";
import type { Application } from "express";
import cors from "cors";
import productRoutes from "./routes/product";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN as string,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/api/v1", productRoutes);
export default app;