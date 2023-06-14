import { Router } from "express";

const router = Router();

router.get("/", (_, res) => res.render("./landing.handlebars"));

export const view = router;
