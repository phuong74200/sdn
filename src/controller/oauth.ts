import { Request, Response } from "express";
import passport from "passport";

const auth = passport.authenticate("google", {
  scope: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/user.birthday.read",
  ],
});
const callback = passport.authenticate("google", {
  successRedirect: "/players",
  failureRedirect: "/login",
});

export default { auth, callback };
