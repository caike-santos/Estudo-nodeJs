import UsuarioRepository from "../repositors/UsuarioRepository.js"

class UsuarioController{
    async index(req, res){
        const row = await UsuarioRepository.findAll()
        res.json(row)
    }

    async create(req, res){
        const data = req.body
        const row = await UsuarioRepository.save(data)
        res.json(row)
    }

    async show(req, res){
        const id = req.params.id
        const row = await UsuarioRepository.findById(id)
        res.json(row)
    }

    async update(req, res){
        const data = req.body.data
        const id = req.params.id
        const row = await UsuarioRepository.update(data, id)
        res.json(row)
    }

    async delete(req, res){
        const id = req.params.data
        const row = await UsuarioRepository.delete(id)
        res.json(row)
    }
}
export default new UsuarioController()