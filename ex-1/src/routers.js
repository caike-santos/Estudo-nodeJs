import { Router } from "express"
import FamiliaController from '../src/app/controllers/FamiliaController.js'

const router = Router()

router.get("/familia", FamiliaController.index);
router.post("/familia", FamiliaController.criar);
router.get("/familiaId/:id", FamiliaController.ler);
router.patch("/familiaId/:id", FamiliaController.atualizar);
router.delete("/familiaId/:id", FamiliaController.deletar);

export default router