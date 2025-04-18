import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import quizRoute from "./route/quiz.route.js";
import userRoute from "./route/user.route.js";
import taskRoute from "./route/task.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
// const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    // mongoose.connect(URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });
    mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/quiz", quizRoute);
app.use("/task", taskRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});