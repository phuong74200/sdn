import { Request, Response, Router } from "express";
import { Player } from "../model/player";
import { NationModel, PlayerModel, UserModel } from "../model";
import { DeletePlayer } from "../types/form";

const router = Router();

interface RequestParams {
  playerId: string;
}

const getView = async (req, res: Response) => {
  const users = await UserModel.find({}).exec();
  return res.render("players/list", { users, user: req.user });
};

export default { getView };
