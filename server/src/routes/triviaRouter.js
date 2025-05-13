import {Router} from "express";
import triviaController from "../controllers/triviaController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/",isLoggedInAPI,triviaController.getTrivias);
router.get("/:id",triviaController.getTriviaById);
router.post("/",isLoggedInAPI,triviaController.createTrivia);
router.put("/:id",triviaController.updateTrivia);
router.delete("/:id",triviaController.deleteTrivia);

export default router