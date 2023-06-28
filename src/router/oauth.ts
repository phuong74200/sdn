import { Router } from "express";
import { nationController, oAuthController } from "../controller";
import isUser from "../middleware/isUser";
import isAdmin from "../middleware/isAdmin";

const router = Router();

router.get("/", oAuthController.auth);
router.get("/callback", oAuthController.callback);

export default router;
