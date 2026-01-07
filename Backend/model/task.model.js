import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    id: String,
    title: String,
    text: String,
    path: String,
});
const Task = mongoose.model("Task", taskSchema);

export default Task;
