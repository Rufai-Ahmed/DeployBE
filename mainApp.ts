import { Application, NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./error/mainError";
import router from "./router/userRouter";
import { errorHandler } from "./error/errorHandler";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1/", router);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          msg: "Welcome to my API",
        });
      } catch (error) {
        console.log(error);
      }
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: "Route error",
          message: `This route ${req.originalUrl} doesn't exist`,
          status: HTTP.BAD,
          success: false,
        })
      );
    });
  } catch (error) {
    // app.use(errorHandler);
    return error;
  }
};
