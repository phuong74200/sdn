import express from "express";
import Handlebars from "handlebars";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import path from "path";
import {
  accountRouter,
  captainRouter,
  loginRouter,
  nationRouter,
  playerRouter,
  profileRouter,
  registerRouter,
} from "./router";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { env } from "./config/env";

import session from "express-session";
import passport from "passport";
import passportStrategy from "./config/passport";

const app = express();

app.use(
  session({
    secret: env.SESSION_SECRET,
    proxy: true,
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 6000, secure: false },
  })
);
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

passportStrategy(passport);

app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "view"));

(async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect("mongodb://127.0.0.1:27017");
  console.log("Connected to MongoDB");

  app.use("/players", playerRouter);
  app.use("/nations", nationRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/captain", captainRouter);
  app.use("/profile", profileRouter);
  app.use("/account", accountRouter);

  app.use("/", (req, res) => {
    res.redirect("/login");
  });

  await app.listen(env.PORT);
  console.log(`Server listening on port ${env.PORT}`);
})();
