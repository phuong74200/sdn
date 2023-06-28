import { Request, Response, Router } from "express";
import { hashPassword, validatePassword } from "../utils/bcrypt";
import { UserModel } from "../model";
import { REGISTER_ERROR } from "../config/message";

const router = Router();

const getView = async (req, res: Response) => {
  return res.render("register/view", { layout: "no-layout" });
};

interface PostParams {
  username: string;
  password: string;
}

const post = async (req: Request<PostParams>, res: Response) => {
  const { username, password } = req.body;

  const checkUser = await UserModel.findOne({ username: username });

  if (checkUser) {
    req.session.REGISTER_ERROR = REGISTER_ERROR;
    await req.session.save();
    return res.redirect("/register");
  }

  const hashedPassword = await hashPassword(password);

  const user = new UserModel({
    username: username,
    password: hashedPassword,
    YOB: 2002,
    name: "fuong",
    isAdmin: false,
  });

  await user.save();

  res.redirect("/login");
};

export default { getView, post };
