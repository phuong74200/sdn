import { Request, Response, Router } from "express";
import { Player } from "../model/player";
import { NationModel, PlayerModel } from "../model";
import { DeletePlayer } from "../types/form";
import { getPaths, hightlightPath } from "../config/path";

const router = Router();

interface RequestParams {
  playerId: string;
}

const getView = async (req, res: Response) => {
  const players = await PlayerModel.find({}).populate("nation").exec();
  return res.render("players/list", {
    players,
    user: req.user,
    path: hightlightPath("/players", getPaths(req.user)),
  });
};

const addView = async (req: Request, res: Response) => {
  const nation = await NationModel.find({});

  return res.render("players/add", {
    nation,
    user: req.user,
    path: hightlightPath("/players", getPaths(req.user)),
  });
};

const updateView = async (req: DeletePlayer, res: Response) => {
  const id = req.params.playerId;

  const player = await PlayerModel.findOne({ _id: id }).populate('nation').exec();
  const nation = await NationModel.find({});

  const selection = [
    {
      content: "Goalkeeper",
    },
    {
      content: "Right Full-back",
    },
    {
      content: "Left Full-back",
    },
    {
      content: "Center-back",
    },
    {
      content: "Sweeper",
    },
    {
      content: "Defensive Midfielder",
    },
    {
      content: "Right Midfielder",
    },
    {
      content: "Center Forward",
    },
    {
      content: "Attacking Midfielder",
    },
  ].map((e) => ({
    ...e,
    selected: player.position === e.content,
  }));

  const nations = nation.map((e: any) => ({
    ...e._doc,
    selected: player.nation.name === e._doc.name,
  }));

  console.log("[n", player.nation);

  console.log("nations", nations);

  return res.render("players/update", {
    player,
    selection,
    user: req.user,
    path: hightlightPath("/players", getPaths(req.user)),
    nations,
  });
};

const addApi = async (req: Request<{}, {}, Player>, res: Response) => {
  console.log(req.body);

  if (req.body.goals < 0) return res.send("Invalid goal");

  const isExist = await PlayerModel.findOne({ name: req.body.name });

  if (isExist) return res.send("Player existed");

  const player = new PlayerModel({
    ...req.body,
    isCaptain: String(req.body.isCaptain) === "on",
  });
  await player.save();
  return res.redirect("/players");
};

const deleteApi = async (req: DeletePlayer, res: Response) => {
  const id = req.params.playerId;

  await PlayerModel.deleteOne({ _id: id });

  return res.redirect("/players");
};

const updateApi = async (
  req: Request<{}, {}, Player & { _id: string }>,
  res: Response
) => {
  console.log(req.body);
  await PlayerModel.findByIdAndUpdate(req.body._id, {
    ...req.body,
    isCaptain: String(req.body.isCaptain) === "on",
  });

  return res.redirect("/players");
};

export default { getView, addView, addApi, deleteApi, updateView, updateApi };
