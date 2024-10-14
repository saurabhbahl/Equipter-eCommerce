import bcryptjs from "bcryptjs";
import { generateToken, getSalt, hashPassword, matchPassword } from "../utils/jwtUtils.js";
import { verifyRequestBody } from "../middlewares/checkRequestBody.js";
import { dbInstance } from "../config/dbConnection.cjs";
import { users } from "../models/userModel.js";
import { eq } from "drizzle-orm";

export async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    // validate feilds
    const missingFields = verifyRequestBody(req.body, [
      "name",
      "email",
      "password",
      "role",
    ]);
    if (missingFields) {
      return res.status(400).json({ success: false, data: { missingFields } });
    }

    // check existing user
    const existingUser = await dbInstance
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }

    const salt = await getSalt();
    const hashedPassword = await hashPassword(password, salt);
    const newUser = await dbInstance
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    // validate feilds
    const missingFields = verifyRequestBody(req.body, ["email", "password"]);
    if (missingFields) {
      return res.status(400).json({ success: false, data: { missingFields } });
    }
    const userExists = await dbInstance
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!userExists?.[0]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    
 
    const isPasswordValid = await matchPassword(password, userExists?.[0].password);
   
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const userData = {
      id: userExists[0]?.id,
      email: userExists[0]?.email,
      name: userExists[0]?.name,
      role: userExists[0]?.role,
    };
    console.log("User data",userData)
    const token=await generateToken(userData)
    res.cookie('token', token, {
      httpOnly: true, 
      secure: false,   
      expires: new Date(Date.now() + 60 * 60 * 1000),
      sameSite: 'Strict' 
  });
    return res.status(200).json({success:true,token,userData})
  } catch (error) {
    console.log(error);
  }
}
