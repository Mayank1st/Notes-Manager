import mongoose from "mongoose";

const connectDB = async (DB_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "TaskManager",
    };
    await mongoose.connect(DB_URL, DB_OPTIONS);
    console.log("Connection successfull");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
