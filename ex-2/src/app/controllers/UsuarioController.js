import UsuarioRepository from "../repositors/UsuarioRepository.js"
import { gerarLinksUsuario, gerarLinksPaginacao } from "../helpers/hateoasHelper.js";

class UsuarioController{
    async index(req, res){
        try{

        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const { data, total, totalPages} = await UsuarioRepository.findAllPaginated(page, limit)
        
        const usuariosComLinks = data.map(user => gerarLinksUsuario(user))

        const linksPaginacao = gerarLinksPaginacao("/usuarios", page, limit, totalPages)

        res.setHeader('cache-control', 'public, max-age=60, must-revalidate')

        res.status(200).json({
            data: usuariosComLinks,
            meta: {
                pageCurrent: page,
                totalRecords: total,
                limitPerPage: limit,
                totalPages: totalPages
            },
            _links: linksPaginacao
        })
    }catch(erro){
        res.status(500).json({title: "Erro interno", detail: erro.message})
    }
    }

    async create(req, res){
        const data = req.body
        const row = await UsuarioRepository.save(data)
        res.json(row)
    }

    async show(req, res){
        try{
            const id = req.params.id
            const row = await UsuarioRepository.findById(id)

            if(!row || row.length() == 0){
                return res.status(404).json({ 
                    title: "Não Encontrado",
                    detail: `Usuário com id ${id} não existe.`})
            }
            const usuario = row[0] || row
            const usuarioComLinks = gerarLinksUsuario(usuario)

             res.setHeader('Cache-Control', 'public, max-age=30, must-revalidate');
             return res.status(200).json(usuarioComLinks)
        }catch(erro){
         res.setHeader('Cache-Control', 'public, max-age=30, must-revalidate');
    }
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