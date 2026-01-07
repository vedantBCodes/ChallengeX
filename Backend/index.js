// Import libraries
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import quizRoute from "./route/quiz.route.js";
import userRoute from "./route/user.route.js";
import taskRoute from "./route/task.route.js";
import otpRoutes from "./route/otpRoutes.js"; // Adjust path if needed

// Configure environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if cannot connect
  }
};

// Define routes
app.use("/quiz", quizRoute);
app.use("/task", taskRoute);
app.use("/user", userRoute);
app.use("/otp", otpRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Call the database connection
connectDB();