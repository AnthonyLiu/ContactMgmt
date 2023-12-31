import { Schema } from "mongoose";
import { Contact, User, UserDocument } from "@models/user.model";

export const getUser = (user: UserDocument) => user.hidePassword();

export const createUser = ({
  username,
  email,
  password,
  contacts,
}: {
  username: string;
  email: string;
  password: string;
  contacts: Contact[];
}) => new User({ username, email, password, contacts });

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value });

export const findUserById = async (id: typeof Schema.Types.ObjectId) => await User.findById(id);

export const saveUser = async (user: UserDocument) => await user.save();

export const setUserPassword = async (user: UserDocument, password: string) => {
  user.password = password;
  return await user.hashPassword();
};

export const deleteUserById = async (user: UserDocument) => await User.findByIdAndDelete(user._id);

export default {
  getUser,
  createUser,
  findUserBy,
  findUserById,
  saveUser,
  setUserPassword,
  deleteUserById,
};
