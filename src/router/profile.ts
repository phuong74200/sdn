import { Request, Response, Router } from "express";
import { playerController, profileController } from "../controller";
import isUser from "../middleware/isUser";

const router = Router();

router.get("/", isUser, profileController.getView);
router.post("/api/update", isUser, profileController.updateApi);

export default router;
