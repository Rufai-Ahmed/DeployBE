import { Router } from "express";
import {
  createUser,
  signInUser,
  verifyUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/verify-user").post(verifyUser);
router.route("/sign-in-user").post(signInUser);

export default router;
