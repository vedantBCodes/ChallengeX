import Quiz from "../model/quiz.model.js";

export const getQuiz = async(req, res) => {
    try {
        const quiz = await Quiz.find();
        res.status(200).json(quiz);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};