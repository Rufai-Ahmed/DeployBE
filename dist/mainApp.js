"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const mainError_1 = require("./error/mainError");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => {
    try {
        app.use("/api/v1/", userRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    msg: "Welcome to my API",
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        app.all("*", (req, res, next) => {
            next(new mainError_1.mainError({
                name: "Route error",
                message: `This route ${req.originalUrl} doesn't exist`,
                status: mainError_1.HTTP.BAD,
                success: false,
            }));
        });
    }
    catch (error) {
        // app.use(errorHandler);
        return error;
    }
};
exports.mainApp = mainApp;
