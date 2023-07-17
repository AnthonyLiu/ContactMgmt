import { Request, Response, NextFunction } from "express";

import sanitize from "mongo-sanitize";
import { validateRegisterInput } from "@validations/user.validation";

import UserService from "@services/user.service";
import TokenService from "@services/token.service";
import LoggerService from "@services/logger.service";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.status(200).send({ message: "User info successfully retrieved", user });
  } else {
    return res.status(400).send({ message: "Unauthenticated request!"});
  }
};

export const postUser = async (req: Request, res: Response) => {
  // Validate Register input
  const { error } = validateRegisterInput(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ username: string; password: string; email: string }>(req.body);

  try {
    let user = await UserService.findUserBy("username", sanitizedInput.username.toLowerCase());

    if (user) {
      return res.status(400).send({ message: "Username already taken. Take an another Username" });
    }

    user = await UserService.findUserBy("email", sanitizedInput.email.toLowerCase());

    if (user) {
      return res.status(400).send({ message: "Email already registered. Take an another email" });
    }

    const newUser = UserService.createUser(sanitizedInput);
    await UserService.setUserPassword(newUser, newUser.password);
    try {
      await UserService.saveUser(newUser);
      const verificationToken = TokenService.createToken();
      TokenService.setUserId(verificationToken, newUser._id);
      TokenService.saveToken(verificationToken);

      return res.status(200).send({ message: "The user is registered!" });
    } catch (error) {
      LoggerService.log.error(error);

      return res.status(500).send({ message: "Creation of user failed, try again." });
    }
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export default {
  getUser,
  postUser,
};
