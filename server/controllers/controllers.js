import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already in Use!" });
    }
    const user = await User.create({ name, email, age });
    return res
      .status(201)
      .json({ success: true, message: "User Created!", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({success:true,data:users});
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(300)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: false, error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }
    if (!email) {
      return res.status(200).json({
        success: false,
        message: "Email is Required to Update the User",
      });
    }
    let emailInUse = await User.findOne({ where: { email: email } });

    if (emailInUse) {
      return res
        .status(200)
        .json({ success: false, message: "Email Should be Unique" });
    }
    await User.update(req.body, { where: { id } });
    const updatedUser = await User.findByPk(id);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while updating the user",
      error: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await user.destroy();
    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
