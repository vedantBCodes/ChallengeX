import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    ans: Number,
});
const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;

