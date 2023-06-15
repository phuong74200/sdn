import { Request, Response, Router } from "express";
import { Player } from "../model/player";
import { NationModel, PlayerModel } from "../model";

const router = Router();

interface RequestParams {
  nationId: string;
}

const getView = async (req: Request<RequestParams>, res: Response) => {
  const nations = await NationModel.find({});
  return res.render("nations/list", { nations, layout: "nation-layout" });
};

const addView = async (req: Request<RequestParams>, res: Response) => {
  return res.render("nations/add");
};

const updateView = async (req: Request<RequestParams>, res: Response) => {
  const id = req.params.nationId;

  const nation = await NationModel.findOne({ _id: id });

  return res.render("nations/update", {
    nation,
    layout: "nation-layout",
  });
};

const addApi = async (req: Request<{}, {}, Player>, res: Response) => {
  const nation = new NationModel(req.body);
  await nation.save();
  return res.redirect("/nations");
};

const deleteApi = async (req: Request<RequestParams>, res: Response) => {
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
