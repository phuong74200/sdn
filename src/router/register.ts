import { Request, Response, Router } from "express";
import { loginController, nationController, playerController, registerController } from "../controller";

const router = Router();

router.get("/", registerController.getView);
router.post("/", registerController.post);

export default router;
