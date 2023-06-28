import { Request, Response, Router } from "express";
import { playerController } from "../controller";
import isUser from "../middleware/isUser";
import isAdmin from "../middleware/isAdmin";

const router = Router();

router.get("/", isUser, playerController.getView);
router.get("/add", isAdmin, playerController.addView);

router.post("/api/add", isAdmin, playerController.addApi);
router.get("/api/delete/:playerId", isAdmin, playerController.deleteApi);
router.post("/api/update", isAdmin, playerController.updateApi);
router.get("/update/:playerId", isAdmin, playerController.updateView);

export default router;
