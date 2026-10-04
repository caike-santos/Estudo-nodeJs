import { json } from "node:stream/consumers";

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };

const nivelMinimo = LEVELS[process.env.LOG_LEVEL] ?? LEVELS[info];

function serializarErro(err) {
  if (!(err instanceof Error)) return err;

  return {
    name: err.name,
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
}

function log(level, message, contexto = {}){
    if(LEVELS[level] < nivelMinimo)return

    const {err, ...restos} = contexto

    const entrada = {
        timestamp: new Date().toISOString,
        level,
        message,
        ...resto,

    }

    if(err){
        entrada = serializarErro(err)
    }

    const linha = JSON.stringify(entrada)

    if(level === "error" || level === "warn"){
        console.error(linha)
    }else{
        console.log(linha)
    }

    const logger = {
  debug: (message, contexto) => log("debug", message, contexto),
  info: (message, contexto) => log("info", message, contexto),
  warn: (message, contexto) => log("warn", message, contexto),
  error: (message, contexto) => log("error", message, contexto),
};

}

export default logger;