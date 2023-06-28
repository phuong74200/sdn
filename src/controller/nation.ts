import { Request, Response, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Player } from "../model/player";
import { NationModel, PlayerModel } from "../model";
import { DeleteNation, PostNationForm } from "../types/form";
import { NATION_ADD_EXIST } from "../config/message";
import { getPaths, hightlightPath } from "../config/path";

const router = Router();

interface RequestParams {
  nationId: string;
}

const getView = async (
  req: Request<ParamsDictionary, any, RequestParams>,
  res: Response
) => {
  const nations = await NationModel.find({});
  return res.render("nations/list", {
    nations,
    path: hightlightPath("/nations", getPaths(req.user)),
    user: req.user,
  });
};

const addView = async (req: Request, res: Response) => {
  return res.render("nations/add", {
    user: req.user,
    path: hightlightPath("/nations", getPaths(req.user)),
  });
};

const updateView = async (req: DeleteNation, res: Response) => {
  const id = req.params.nationId;

  const nation = await NationModel.findOne({ _id: id });

  return res.render("nations/update", {
    nation,
    path: hightlightPath("/nations", getPaths(req.user)),
    user: req.user,
  });
};

const addApi = async (req: PostNationForm, res: Response) => {
  const isExist = await NationModel.findOne({ name: req.body.name });

  if (isExist) {
    req.session.NATION_ADD_EXIST = NATION_ADD_EXIST;
    await req.session.save();
    return res.redirect("/nations/add");
  }

  const nation = new NationModel(req.body);
  await nation.save();
  return res.redirect("/nations");
};

const deleteApi = async (req: DeleteNation, res: Response) => {
  const id = req.params.nationId;

  await NationModel.deleteOne({ _id: id });

  return res.redirect("/nations");
};

const updateApi = async (
  req: Request<{}, {}, Player & { _id: string }>,
  res: Response
) => {
  await NationModel.findByIdAndUpdate(req.body._id, {
    ...req.body,
  });

  return res.redirect("/nations");
};

export default { getView, addView, addApi, deleteApi, updateView, updateApi };
