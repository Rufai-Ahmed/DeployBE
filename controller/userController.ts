import { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(3).toString("hex");

    const user = await userModel.create({
      email,
      password: hashed,
      verifyToken: token,
    });

    return res.status(HTTP.CREATED).json({
      msg: "Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Error",
      data: new mainError({
        name: "createUser",
        message: "",
        status: HTTP.BAD,
        success: false,
      }),
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { email, verifyToken } = req.body;

    const emailCheck = await userModel.findOne({ email });
    const tokenCheck = await userModel.findOne({ verifyToken });

    if (emailCheck && tokenCheck) {
      await userModel.findByIdAndUpdate(
        emailCheck._id,
        {
          verifyToken: "",
          verified: true,
        },
        { new: true }
      );

      return res.status(HTTP.CREATED).json({
        msg: "Verified",
      });
    } else {
      return res.status(HTTP.BAD).json({
        msg: "Error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Error",
      data: new mainError({
        name: "createUser",
        message: "",
        status: HTTP.BAD,
        success: false,
      }),
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const emailCheck = await userModel.findOne({ email });

    if (emailCheck) {
      const passwordChecker = await bcrypt.compare(
        password,
        emailCheck.password
      );

      if (passwordChecker) {
        if (emailCheck.verified && emailCheck.verifyToken === "") {
          const user = jwt.sign(
            { id: emailCheck._id, status: emailCheck.status },
            process.env.SECRET!,
            {
              expiresIn: process.env.DAY,
            }
          );

          return res.status(HTTP.CREATED).json({
            msg: "Signed in",
            data: user,
          });
        } else {
          return res.status(HTTP.BAD).json({
            msg: "Password Error",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          msg: "Password Error",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        msg: "Error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Error",
      data: new mainError({
        name: "createUser",
        message: "",
        status: HTTP.BAD,
        success: false,
      }),
    });
  }
};
