import { Router } from "express";
import { nationController } from "../controller";
import isUser from "../middleware/isUser";
import isAdmin from "../middleware/isAdmin";

const router = Router();

router.get("/", isUser, nationController.getView);
router.get("/add", isAdmin, nationController.addView);

router.post("/api/add", isAdmin, nationController.addApi);
router.get("/api/delete/:nationId", isAdmin, nationController.deleteApi);
router.post("/api/update", isAdmin, nationController.updateApi);
router.get("/update/:nationId", isAdmin, nationController.updateView);

export default router;
