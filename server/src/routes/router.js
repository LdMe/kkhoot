import { Router } from "express";
import triviaRouter from "./triviaRouter.js";
import authRouter from "./authRouter.js";
import gameSessionRouter from "./gameSessionRouter.js";

const router = Router();

// router.use("/api",apiRouter);

// router.use("/",viewRouter);

router.get("/",(req,res)=>{
    res.send("hola mundo")
})
router.use("/trivia",triviaRouter);
router.use("/",authRouter);
router.use("/session",gameSessionRouter);

export default router