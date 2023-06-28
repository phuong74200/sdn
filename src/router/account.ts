import { Request, Response, Router } from "express";
import {
  accountController,
  loginController,
  nationController,
  playerController,
} from "../controller";
import passport from "passport";
import isAdmin from "../middleware/isAdmin";

const router = Router();

router.get("/", isAdmin, accountController.getView);
router.get("/logout", accountController.logout);

export default router;
