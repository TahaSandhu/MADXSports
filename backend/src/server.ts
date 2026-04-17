import dotenv from "dotenv";
import app from "./app";
import connectDataBase from "./db";

dotenv.config();

connectDataBase()
  .then(() => {
    const PORT = (process.env.PORT as string) || "8080";

    const server = app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });

    server.on("error", (err: Error) => {
      console.error("Server error:", err);
      throw err;
    });
  })
  .catch((err: unknown) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });