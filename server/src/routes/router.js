import { Router } from "express";
import triviaRouter from "./triviaRouter.js";
import authRouter from "./authRouter.js";
const router = Router();

// router.use("/api",apiRouter);

// router.use("/",viewRouter);

router.get("/",(req,res)=>{
    res.send("hola mundo")
})
router.use("/trivias",triviaRouter);
router.use("/",authRouter);

export default router