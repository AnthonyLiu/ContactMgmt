import { model, Schema, Document } from "mongoose";
import { omit } from "ramda";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  expires?: Date;
  contacts?: Contact[];

  comparePassword(password: string): boolean;
  hidePassword(): void;
  hashPassword(): Promise<string>;
}

/**
 * Design the contact as a sub-document of user
 */
const contactSchema = new Schema<Contact>({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
});

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  expires: { type: Date, default: dayjs().toDate(), expires: 43200 },
  contacts: [contactSchema],
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
        return;
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
          return;
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};

export const User = model<UserDocument>("User", userSchema);

export default User;
