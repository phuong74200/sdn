import { Request, Response, Router } from "express";
import { loginController, nationController, playerController } from "../controller";

const router = Router();

router.get("/", loginController.getView);
router.post("/", loginController.post);

export default router;
