import Task from "../model/task.model.js";

export const getTask = async(req, res) => {
    try {
        const task = await Task.find().sort({ id: 1 });
        res.status(200).json(task);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
