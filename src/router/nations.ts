import { Request, Response, Router } from "express";
import { nationController, playerController } from "../controller";

const router = Router();

router.get("/", nationController.getView);
router.get("/add", nationController.addView);

router.post("/api/add", nationController.addApi);
router.get("/api/delete/:nationId", nationController.deleteApi);
router.post("/api/update", nationController.updateApi);
router.get("/update/:nationId", nationController.updateView);

export default router;
