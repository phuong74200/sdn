import { Request, Response, Router } from "express";
import {
  loginController,
  nationController,
  playerController,
} from "../controller";
import passport from "passport";

const router = Router();

router.get("/", loginController.getView);
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/players",
  }),
  loginController.post
);

export default router;
