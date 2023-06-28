import { Request, Response, Router } from "express";
import { hashPassword, validatePassword } from "../utils/bcrypt";
import { UserModel } from "../model";

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

const post = async (req: Request<PostParams>, res: Response) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    username: username,
  });

  if (!user) {
    req.session.login = {
      user: user,
    };
    return res.redirect("/login");
  }

  return res.redirect("/login");
};

export default { getView, post };