import { Router } from "express"
import UsuarioController from "./app/controllers/UsuarioController.js"
import RoupaController from "./app/controllers/RoupaController.js"

const router = Router()

router.get('/usuarios', UsuarioController.index)
router.get('/usuarios/:id', UsuarioController.show)
router.post('/usuarios', UsuarioController.create)
router.patch('/usuarios/:id', UsuarioController.update)
router.delete('/usuarios/:id', UsuarioController.delete)

router.get('/roupas', RoupaController.index)
router.get('/roupas/:id', RoupaController.show)
router.post('/roupas', RoupaController.create)
router.patch('/roupas/:id', RoupaController.update)
router.delete('/roupas/:id', RoupaController.delete)

router.get('/usuarios/:idUsuario/roupas', UsuarioController.showRoupasPaginated)
export default router
