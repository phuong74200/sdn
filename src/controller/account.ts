import { Request, Response, Router } from "express";
import { Player } from "../model/player";
import { NationModel, PlayerModel, UserModel } from "../model";
import { DeletePlayer } from "../types/form";
import { getPaths, hightlightPath, paths } from "../config/path";

const router = Router();

interface RequestParams {
  playerId: string;
}

const getView = async (req, res: Response) => {
  const users = await UserModel.find({}).exec();

  return res.render("account/view", {
    users,
    user: req.user,
    path: hightlightPath("/account", getPaths(req.user)),
  });
};

const logout = async (req: Request, res: Response, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

export default { getView, logout };
