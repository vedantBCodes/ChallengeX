import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { validateUpiCore } from "./upiValidation.controller.js";

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findUserByEmail = (email = "") => {
    const normalizedEmail = email.trim().toLowerCase();
    return User.findOne({
        email: { $regex: `^${escapeRegex(normalizedEmail)}$`, $options: "i" },
    });
};

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await findUserByEmail(email);

        if (user) {
            return res.status(409).json({
                exists: true,
                message: "User already exists",
            });
        }

        return res.status(200).json({
            exists: false,
            message: "Email is available",
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signup = async(req, res) => {
    try {
        const { fullname, email ,phoneno, upiid, password } = req.body;        
        const validationResult = await validateUpiCore(upiid);
        const enforceProviderValidation = process.env.UPI_VALIDATE_ON_SIGNUP === "true";

        if (!validationResult.valid) {
            return res.status(400).json({ message: validationResult.reason });
        }

        if (enforceProviderValidation && validationResult.source !== "provider") {
            return res.status(400).json({
                message: "UPI provider validation is mandatory. Please configure provider credentials.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await findUserByEmail(normalizedEmail);
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: normalizedEmail,
            phoneno: phoneno,
            upiid: validationResult.normalizedUpiid,
            password: hashPassword,
           
            // password:password
        });
        await createdUser.save();
        res.status(201).json({
            success: true, // ✅ ADD THIS
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                upiid: createdUser.upiid,
                phoneno: createdUser.phoneno,
                email: createdUser.email,
            },
        });
        
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
