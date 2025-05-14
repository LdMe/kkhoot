import {Router} from "express";
import gameSessionController from "../controllers/gameSessionController.js";

const router = Router();

router.get("/:id",gameSessionController.getGameSession);
router.post("/:id/start",gameSessionController.startGameSession);
router.post("/:id/join",gameSessionController.joinPlayer);
router.get("/:id/question",gameSessionController.getQuestion);
router.post("/:id/question",gameSessionController.nextQuestion);
router.post("/:id/answer",gameSessionController.answerQuestion);
router.get("/:id/stats/question",gameSessionController.getQuestionPlayersStats);
router.get("/:id/stats",gameSessionController.getSessionPlayerStats);

export default router