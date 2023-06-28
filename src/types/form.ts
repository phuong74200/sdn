import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export type PostLoginForm = Request<
  ParamsDictionary,
  any,
  {
    username: string;
    password: string;
    remember: string;
  }
>;

export type PostNationForm = Request<
  ParamsDictionary,
  any,
  {
    name: string;
  }
>;

export type PostProfileUpdate = Request<
  ParamsDictionary,
  any,
  {
    name: string;
    YOB: number;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }
>;

export type DeleteNation = Request<
  ParamsDictionary,
  {
    nationId: string;
  },
  any
>;

export type DeletePlayer = Request<
  ParamsDictionary,
  {
    playerId: string;
  },
  any
>;
