import express from "express";
import FamiliaController from "./app/controllers/FamiliaController.js"
const app = express();

app.use(express.json());
app.get("/familia", FamiliaController.index);
app.post("/cadastra", FamiliaController.criar);
app.get("/buscaId/:id", FamiliaController.ler);
app.put("/buscaId/:id", FamiliaController.atualizar);
app.delete("/buscaId/:id", FamiliaController.deletar);

export default app;
