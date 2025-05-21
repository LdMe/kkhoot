import { verifyToken } from "../utils/token.js";
/**
 * Middleware para proteger rutas que requieren autenticación,
 * Se verifica que el token sea válido y que el usuario exista,
 * si el token es válido, se agrega el usuario actual a la request
 * para que pueda ser utilizado en los controladores
 * @param {Request} req - La request actual
 * @param {Response} res - La response actual
 * @param {NextFunction} next - La función next para continuar con el flujo
 */
function isLoggedInAPI(req,res,next){
    const authorization  = req.headers.authorization;
    console.log("authorization",authorization);
    if(!authorization){
        res.status(401).json({error:"You shall not pass"});
    }
    let token = authorization.split(" "); // si no hay bearer espacio fallaria
    token = token.pop();
    const result = verifyToken(token);
    console.log("token verified",result);
    if(result){
        req.user = {
            _id: result._id 
        }
        next();
    }else{
        res.status(401).json({error:"You shall not pass"});
    }
}

export {
    isLoggedInAPI
}