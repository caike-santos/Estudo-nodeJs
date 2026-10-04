import { AppError, NotFoundError, BadRequestError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export function notFoundHandler(req, res, next){
    next(new NotFoundError(`Rota ${req.method} ${req.originalUrl} não existe.`))
}

function converterParaAppError(err){
    if(err instanceof AppError){
        return err
    }
    
    if(err.type === "entity.parse.failed"){
        return new BadRequestError("O corpo da requisição contém um JSON inválido.")
    }

    return new AppError(500, "Internal Server Error", "Ocorreu um erro inesperado")
}

export function errorHandler(err, req, res, next){
    const erro = converterParaAppError(err)

    const contexto = {
    method: req.method,
    url: req.originalUrl,
    status: erro.status,
  };

    if(erro.status >= 500){
        logger.error(erro.message, {contexto, err})
    }else{
        logger.warn((erro.message, contexto));
        
    }

    return res.status(erro.status).json({
    type: `https://httpstatuses.com/${erro.status}`,
    title: erro.title,
    status: erro.status,
    detail: erro.detail,
    instance: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
}
