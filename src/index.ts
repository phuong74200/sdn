import express from "express";
import Handlebars from "handlebars";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import path from "path";
import { nationRouter, playerRouter } from "./router";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "view"));

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017");

  app.use("/players", playerRouter);
  app.use("/nations", nationRouter);

  app.listen(5300);
})();
