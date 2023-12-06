import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL: string | undefined = process.env.DATABASE_STRING;

export const dbConfig = async () => {
  try {
    await connect("mongodb://localhost:27017/flowDB"!).then(() => {
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};
