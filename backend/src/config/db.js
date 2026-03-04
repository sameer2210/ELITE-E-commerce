import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const mongoUri = (process.env.MONGO_URI || "").trim();
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`You are connect to MongoDB database: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
