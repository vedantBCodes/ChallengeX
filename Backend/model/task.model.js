import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    id: Number,
    title: String,
    text: String,
    path: String,
});
const Task = mongoose.model("Task", taskSchema);

export default Task;

// { "id": 1 ,"title": "Simple Quiz", "text": "It is a simple quiz game which consists of questions where you have to score 8+ in a perticular time", "path":"/quiz" },


