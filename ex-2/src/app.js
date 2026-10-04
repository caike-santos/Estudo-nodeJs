import express from "express";
import router from "./routers.js";
import { validarConteudo, verificarAccepts } from "./app/middlewares/httpValidation.js";
import { notFoundHandler, errorHandler } from "./app/middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(validarConteudo);

app.use(verificarAccepts);

app.use(router);

app.use(notFoundHandler)

app.use(errorHandler)

export default app;
