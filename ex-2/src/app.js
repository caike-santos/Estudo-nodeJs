import express from "express";
import router from "./routers.js";
import { validarConteudo, verificarAccepts } from "./app/middlewares/httpValidation.js";

const app = express();

app.use(express.json());

app.use(validarConteudo);

app.use(verificarAccepts);

app.use(router);

export default app;
