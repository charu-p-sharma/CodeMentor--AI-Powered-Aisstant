import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatToUser,
} from "../controllers/chat-controllers.js";

// Protected API
const chatRoutes = Router();

// new chat route
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

// fetch all chats route
chatRoutes.get("/all-chats", verifyToken, sendChatToUser);

chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
