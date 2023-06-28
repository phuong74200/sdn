import { NextFunction, Request, Response } from "express";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  res.render("error/404", { layout: "no-layout" });
};

export default isUser;
