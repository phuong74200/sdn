import { NextFunction, Request, Response } from "express";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.isAdmin) return next();
  return res.render("error/404", { layout: "no-layout" });
};

export default isAdmin;
