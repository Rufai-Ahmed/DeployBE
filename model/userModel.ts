import { Document, Schema, model } from "mongoose";

interface iUser {
  email: string;
  password: string;
  status: string;
  verified: boolean;
  verifyToken: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    email: { type: String, unique: true },
    password: { type: String },
    status: { type: String, default: "user" },
    verified: { type: Boolean, default: false },
    verifyToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<iUserData>("users", userModel);
