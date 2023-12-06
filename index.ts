import express, { Application, json } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";
import dotenv from "dotenv";
import { mainApp } from "./mainApp";

dotenv.config();
const app: Application = express();

const port: string | number = process.env.PORT!;

app.use(json());
app.use(cors());

mainApp(app);

app.listen(parseInt(port), () => {
  dbConfig();
});
