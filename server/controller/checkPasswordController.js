import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // Import mongoose to validate ObjectId

const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;
    // Log the received userId
    console.log("Received userId:", userId);

    // Check if userId is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        error: true,
        data: null,
      });
    }

    // Fetch the user from the database
    const checkPassword = await UserModel.findById(userId);

    // Check if user exists
    if (!checkPassword) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        data: null,
      });
    }

    // Verify the password
    const verifyPassword = await bcryptjs.compare(
      password,
      checkPassword.password
    );
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
        error: true,
        data: null,
      });
    }

    // Generate JWT (without including password)
    const token = jwt.sign(
      {
        userId: checkPassword._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );
    console.log("JWT token is: ", token);

    // Define cookie options
    const cookieToken = {
      httpOnly: true,
      secure: true,
    };

    // Set cookie and send response
    res.cookie("token", token, cookieToken).status(200).json({
      message: "Password is correct",
      error: false,
      data: checkPassword,
    });
    console.log("User login success");
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).json({
      message: "Server error",
      error: true,
      data: null,
    });
  }
};

export { checkPassword };
