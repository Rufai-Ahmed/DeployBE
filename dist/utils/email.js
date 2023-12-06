"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const googleapis_1 = __importDefault(require("googleapis"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const GOOGLE_ID = "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH = "1//04niB3092spRHCgYIARAAGAQSNwF-L9IrqnK4LW9U4514wO3gQLRNlNgHUDQRFDx__vNUd9fUWcSjuPhFW1axNBa8waSwOqRkr-g";
const oAuth = new googleapis_1.default.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URL);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
const sendMail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH,
                accessToken,
            },
        });
        const mailerOption = {
            from: "Welcome back <codelabbest@gmail.com>",
            to: "shecodesaj@gmail.com",
            subject: "Account Verification",
            html: ` <p>test</p>`,
            text: "We are here",
        };
        yield transport.sendMail(mailerOption);
    }
    catch (error) {
        return error;
    }
});
exports.sendMail = sendMail;
