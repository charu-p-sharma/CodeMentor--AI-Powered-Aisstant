import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Checking if the user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already registered");
    }

    // Encrypting the password before storing in the db
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    return res.status(200).json({ message: "OK", id: user._id.toString() });
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};
