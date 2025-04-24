import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async(req, res) => {
    try {
        const { fullname, email ,phoneno, upiid, password } = req.body;        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            phoneno: phoneno,
            upiid: upiid,
            password: hashPassword,
           
            // password:password
        });
        await createdUser.save();
        res.status(201).json({
<<<<<<< HEAD
            success: true, // ✅ ADD THIS
=======
>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                upiid: createdUser.upiid,
                phoneno: createdUser.phoneno,
                email: createdUser.email,
            },
        });
<<<<<<< HEAD
        
=======
>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneno: user.phoneno,
                upiid: user.upiid,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
