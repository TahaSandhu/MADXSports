import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants";

const connectDataBase = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI as string}/${DATABASE_NAME}`
    );

    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error: unknown) {
    console.error("MONGO DB connection error", error);
    process.exit(1);
  }
};

export default connectDataBase;