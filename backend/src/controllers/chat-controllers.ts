import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or Token not verified" });

    // fetch chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats which are new to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    const reply = chatResponse.data.choices[0].message;

    if (!reply) {
      return res.status(500).json({ message: "No response from OpenAI" });
    }

    user.chats.push({
      content: reply.content || "",
      role: reply.role || "assistant",
    });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong with chats" });
  }
};

export const sendChatToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user token check and validation
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token not verified");
    }

    console.log(user._id.toString(), res.locals.jwtData.id);

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied, as token not verified");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user token check and validation
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token not verified");
    }

    console.log(user._id.toString(), res.locals.jwtData.id);

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied, as token not verified");
    }

    // set the chats as an empty array
    // @ts-ignore
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};
