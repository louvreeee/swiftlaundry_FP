import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt"; // Import bcrypt

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://swiftlaundry:swift123laundry@softwaredesign.q00tzsk.mongodb.net/?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).exec();
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email }).exec();
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const user = new User({
                name,
                email,
                password: hashedPassword, // Store the hashed password
            });
            await user.save();
            res.send({ message: "Successfully Registered" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error" });
    }
});

app.listen(3001, () => {
    console.log("Server is Running");
});
