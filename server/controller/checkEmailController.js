import UserModel from "../models/userModel.js";
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkMail = await UserModel.findOne({ email });

    if (!checkMail)
      return res.status(400).json({
        error: "Email not exists",
        success: false,
        data: null,
      });

    return res.json({
      error: null,
      message: "email verify true ",
      success: true,
      data: checkMail,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
      data: null,
    });
  }
};

export { checkEmail };