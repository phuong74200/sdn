import express from "express";
import mongoose from "mongoose";
import { nationRouter } from "./controller";
import path from "path";
import { view } from "./view";
import { engine } from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "view"));

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sdn");

  app.use(view);
  app.use("/api/nation", nationRouter);

  app.listen(5300);
})();
