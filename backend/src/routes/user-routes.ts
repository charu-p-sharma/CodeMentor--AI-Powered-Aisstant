import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";

const userRoutes = Router();

// ROUTES

// User Signup Route
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);

// User Login Route
userRoutes.post("/login", validate(loginValidator), userLogin);

export default userRoutes;
