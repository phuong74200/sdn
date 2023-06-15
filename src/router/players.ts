import { Request, Response, Router } from "express";
import { playerController } from "../controller";

const router = Router();

router.get("/", playerController.getView);
router.get("/add", playerController.addView);

router.post("/api/add", playerController.addApi);
router.get("/api/delete/:playerId", playerController.deleteApi);
router.post("/api/update", playerController.updateApi);
router.get("/update/:playerId", playerController.updateView);

export default router;
