import express from "express";
import Handlebars from "handlebars";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import path from "path";
import { loginRouter, nationRouter, playerRouter, registerRouter } from "./router";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { env } from "./config/env";

import session from "express-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

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

  app.use("/", (req, res) => {
    res.redirect("/login");
  });

  await app.listen(env.PORT);
  console.log(`Server listening on port ${env.PORT}`);
})();
