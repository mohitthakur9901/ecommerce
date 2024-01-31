import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

function connectDB() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));
}

export default connectDB;