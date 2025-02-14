
import User_data from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const registerUser = async (req, res) => {
  const { username, email, password, fullName, gender, dob, country } = req.body;
  try {
    const existingUser = await User_data.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User_data({
      username, email, password: hashedPassword, fullName, gender, dob, country
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User_data.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    res.header('auth-token', token).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUser = async (req, res) => {
  const { query } = req.query;
  try {
    const user = await User_data.findOne({ 
      $or: [{ username: query }, { email: query }] 
    }).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {registerUser,searchUser,loginUser};
