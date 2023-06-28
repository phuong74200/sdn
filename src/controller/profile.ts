import { Request, Response, Router } from "express";
import { Player } from "../model/player";
import { NationModel, PlayerModel, UserModel } from "../model";
import { PostProfileUpdate } from "../types/form";
import {
  PROFILE_EMPTY_PASSWORD,
  PROFILE_OLD_PASSWORD_INCORRECT,
  PROFILE_UPDATE_PASSWORD_MISMATCH,
  PROFILE_UPDATE_SUCCESS,
} from "../config/message";
import { hashPassword, validatePassword } from "../utils/bcrypt";

const router = Router();

interface RequestParams {
  playerId: string;
}

const getView = async (req: Request, res: Response) => {
  const { user } = req;

  const years = new Array(100).fill(0).map((e, i) => ({
    content: new Date().getFullYear() - 10 - i,
    selected: new Date().getFullYear() - 10 - i === user.YOB,
  }));

  return res.render("profile/update", { user, years, layout: "profile-layout" });
};

const updateApi = async (req: PostProfileUpdate, res: Response) => {
  const { body } = req;

  req.session.PROFILE_UPDATE_SUCCESS = undefined;
  req.session.PROFILE_UPDATE_ERROR = undefined;

  if (
    (body.newPassword || body.confirmPassword) &&
    !(await validatePassword(body.oldPassword, req.user.password))
  ) {
    console.log("here");
    req.session.PROFILE_UPDATE_ERROR = PROFILE_OLD_PASSWORD_INCORRECT;
    await req.session.save();
    return res.redirect("/profile");
  }

  if (!Boolean(body.oldPassword)) {
    await UserModel.findByIdAndUpdate(req.user._id, {
      name: body.name,
      YOB: body.YOB,
    });
    req.session.PROFILE_UPDATE_SUCCESS = PROFILE_UPDATE_SUCCESS;
    await req.session.save();
    return res.redirect("/profile");
  }

  if (!validatePassword(body.oldPassword, req.user.password)) {
    req.session.PROFILE_UPDATE_ERROR = PROFILE_OLD_PASSWORD_INCORRECT;
    await req.session.save();
    return res.redirect("/profile");
  }

  if (!Boolean(body.newPassword) || !Boolean(body.confirmPassword)) {
    req.session.PROFILE_UPDATE_ERROR = PROFILE_EMPTY_PASSWORD;
    await req.session.save();
    return res.redirect("/profile");
  }

  if (body.newPassword !== body.confirmPassword) {
    req.session.PROFILE_UPDATE_ERROR = PROFILE_UPDATE_PASSWORD_MISMATCH;
    await req.session.save();
    return res.redirect("/profile");
  }

  await UserModel.findByIdAndUpdate(req.user._id, {
    name: body.name,
    YOB: body.YOB,
    password: await hashPassword(body.newPassword),
  });
  req.session.PROFILE_UPDATE_SUCCESS = PROFILE_UPDATE_SUCCESS;
  await req.session.save();

  return res.redirect("/profile");
};

export default { getView, updateApi };
