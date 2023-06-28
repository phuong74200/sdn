import { Request, Response, Router } from "express";
import { captainController, playerController } from "../controller";
import isUser from "../middleware/isUser";

const router = Router();

router.get("/", isUser, captainController.getView);

export default router;
