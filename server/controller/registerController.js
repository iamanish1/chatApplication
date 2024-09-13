import bcryptjs from 'bcryptjs';
import UserModel from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkMail = await UserModel.findOne({ email });
    if (checkMail) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    //   password into haspasword
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      profile_pic,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true, data : user });
  } catch (error) {
    res.json({
      error: error.message,
      status: 500,
      success: false,
    });
  }
};

export { registerUser };
