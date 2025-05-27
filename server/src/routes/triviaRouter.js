import {Router} from "express";
import triviaController from "../controllers/triviaController.js";
import gameSessionController from "../controllers/gameSessionController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Trivias
 *   description: Rutas de trivias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Trivia:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la trivia
 *         title:
 *           type: string
 *           description: Título de la trivia
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 *           description: Número de version
 * 
 *     Question:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *           description: Pregunta de la trivia
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Answer'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 *           description: Número de version
 * 
 *     Answer:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Texto de la respuesta
 *         isCorrect:
 *           type: boolean
 *           description: Indica si la respuesta es correcta
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 *           description: Número de version
 * 
 *     TriviaPost:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la trivia
 *           example: "Trivia de programación"
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionPost'
 * 
 *     QuestionPost:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *           description: Pregunta de la trivia
 *           example: "¿Cuál es el lenguaje de programación más popular?"
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AnswerPost'
 * 
 *     AnswerPost:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Texto de la respuesta
 *           example: "JavaScript"
 *         isCorrect:
 *           type: boolean
 *           description: Indica si la respuesta es correcta
 *           example: true
 * 
 * 
 */
/**
 * @swagger
 * /trivia:
 *   get:
 *     tags: [Trivias]
 *     summary: Obtener todas las trivias
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trivias:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trivia'
 *                 total:
 *                   type: number
 * 
 */
router.get("/",isLoggedInAPI,triviaController.getTrivias);


router.get("/:id",triviaController.getTriviaById);

/**
 * @swagger
 * /trivia:
 *   post:
 *     tags: [Trivias]
 *     summary: Crear una trivia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TriviaPost'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trivia'
 * 
 *
 */
router.post("/",isLoggedInAPI,triviaController.createTrivia);
router.put("/:id",triviaController.updateTrivia);
router.delete("/:id",triviaController.deleteTrivia);

router.post("/:id/start",gameSessionController.createGameSession);
export default router