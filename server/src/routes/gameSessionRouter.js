import {Router} from "express";
import gameSessionController from "../controllers/gameSessionController.js";

const router = Router();

router.get("/:id",gameSessionController.getGameSession);
router.post("/:id/start",gameSessionController.startGameSession);
router.post("/:id/join",gameSessionController.joinPlayer);
router.get("/:id/question",gameSessionController.getQuestion);
router.post("/:id/question",gameSessionController.nextQuestion);

export default router