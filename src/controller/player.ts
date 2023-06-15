import { Request, Response, Router } from "express";
import { Player } from "../model/player";
import { PlayerModel } from "../model";

const router = Router();

interface RequestParams {
  playerId: string;
}

const getView = async (req: Request<RequestParams>, res: Response) => {
  const players = await PlayerModel.find({});
  return res.render("players/list", { players });
};

const addView = async (req: Request<RequestParams>, res: Response) => {
  return res.render("players/add");
};

const updateView = async (req: Request<RequestParams>, res: Response) => {
  const id = req.params.playerId;

  const player = await PlayerModel.findOne({ _id: id });

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

  return res.render("players/update", {
    player,
    selection,
  });
};

const addApi = async (req: Request<{}, {}, Player>, res: Response) => {
  console.log(req.body);

  const player = new PlayerModel({
    ...req.body,
    isCaptain: String(req.body.isCaptain) === "on",
  });
  await player.save();
  return res.redirect("/players");
};

const deleteApi = async (req: Request<RequestParams>, res: Response) => {
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
