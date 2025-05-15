import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server as socketIo } from 'socket.io';
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongoose.js";
import gameSessionController from "./controllers/gameSessionController.js";

dotenv.config();
connectDB();
const APP_PORT = process.env.APP_PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();
const corsOptions = {
    // origin: CLIENT_URL,
    // credentials: true // Permitir envío de cookies
}
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json()); // para API (formato json)
app.use(express.urlencoded({extended:true})); // para Vistas (formato formulario)




const httpServer = http.createServer(app);
const io = new socketIo(httpServer,{ // Crea una instancia de Socket.io adjunta al servidor HTTP
    cors: {
        origin: '*', // Permite conexiones desde cualquier origen
    },
});
app.use((req,res,next)=>{
    req.io = io;
    next();
})
io.on("connection", (socket) => {
    console.log("conexion",socket.id)
    socket.on("join",(data)=>{
        console.log("join",data,socket.id);
        gameSessionController.saveSocketIdToPlayer(data.username,data.sessionId,socket.id);
    })
})

app.use("/",router);
httpServer.listen(3000,()=>{
    console.log(`Backend conectado al puerto ${APP_PORT}`);
})