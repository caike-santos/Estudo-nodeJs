import { Router } from "express"
import FamiliaController from '../src/app/controllers/FamiliaController.js'

const router = Router()

router.get("/familia", FamiliaController.index);
router.post("/cadastra", FamiliaController.criar);
router.get("/buscaId/:id", FamiliaController.ler);
router.put("/buscaId/:id", FamiliaController.atualizar);
router.delete("/buscaId/:id", FamiliaController.deletar);

export default router