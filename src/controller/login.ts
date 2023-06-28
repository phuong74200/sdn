import { Request, Response, Router } from "express";
import { hashPassword, validatePassword } from "../utils/bcrypt";
import { UserModel } from "../model";
import { LOGIN_FAILED } from "../config/message";
import passport from "passport";

const router = Router();

interface RequestParams {
  nationId: string;
}

const getView = async (req: Request<RequestParams>, res: Response) => {
  return res.render("login/login", { layout: "no-layout" });
};

interface PostParams {
  username: string;
  password: string;
}

const post = async (req: Request<PostParams>, res: Response, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.send("Error");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Redirect or send a response indicating successful login
      res.send("success");
    });
  })(req, res, next);
};

export default { getView, post };
