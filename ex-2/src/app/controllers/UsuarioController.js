import UsuarioRepository from "../repositors/UsuarioRepository.js";
import RoupaRepository from "../repositors/RoupaRepository.js";
import {
  gerarLinksUsuario,
  gerarLinksPaginacao,
  gerarLinksRoupa,
} from "../helpers/helperHateoas.js";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";

class UsuarioController {
  async index(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { data, total, totalPages } =
      await UsuarioRepository.findAllPaginated(page, limit);

    const usuariosComLinks = data.map((user) => gerarLinksUsuario(user));

    const linksPaginacao = gerarLinksPaginacao(
      "/usuarios",
      page,
      limit,
      totalPages,
    );

    res.setHeader("cache-control", "public, max-age=60, must-revalidate");

    return res.status(200).json({
      data: usuariosComLinks,
      meta: {
        pageCurrent: page,
        totalRecords: total,
        limitPerPage: limit,
        totalPages: totalPages,
      },
      _links: linksPaginacao,
    });
  }

  async create(req, res) {
    const data = req.body;
    if (!data ||Object.keys(data).length === 0) {
      throw new BadRequestError(`Nenhum dado foi enviado.`)
    }
    const row = await UsuarioRepository.save(data);
    const id = row.insertId;

    const novoUsuario = { id: id, ...data };
    const usuarioComLinks = gerarLinksUsuario(novoUsuario);

    res.setHeader("Location", `/usuarios/${id}`);
    res.status(201).json(usuarioComLinks);
  }

  async show(req, res) {
    const id = req.params.id;
    const row = await UsuarioRepository.findById(id);

    if (!row || row.length === 0) {
      throw new NotFoundError(`Usuário com id ${id} não existe.`)
    }
    const usuario = row[0] || row;
    const usuarioComLinks = gerarLinksUsuario(usuario);

    res.setHeader("Cache-Control", "public, max-age=30, must-revalidate");
    return res.status(200).json(usuarioComLinks);
  }

  async showRoupasPaginated(req, res){
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const id = req.params.idUsuario

    const {data, total, totalPages} = await RoupaRepository.findByIdUsuarioPaginated(page, limit, id)

    const roupasComLinks = data.map((roupa) => gerarLinksRoupa(roupa))
    const linksPaginacao = gerarLinksPaginacao(
      `/usuarios/${id}/roupas`,
      page,
      limit,
      totalPages
    ) 

    res.setHeader("cache-control", "public, max-age=60, must-revalidate");

    return res.status(200).json({
      data: roupasComLinks,
      meta: {
        pageCurrent: page,
        totalRecords: total,
        limitPerPage: limit,
        totalPages: totalPages,
      },
      _links: linksPaginacao
    })
  }

  async update(req, res) {
    const data = req.body;
    if (!data ||Object.keys(data).length === 0) {
      throw new BadRequestError(`Nenhum dado foi enviado.`)
    }
    const id = req.params.id;
    const row = await UsuarioRepository.update(data, id);

    if (row.affectedRows === 0) {
      throw new NotFoundError(`Usuario com id ${id} não existe.`)
    }

    const atualizado = await UsuarioRepository.findById(id);
    const usuario = atualizado[0] || atualizado;

    res.status(200).json(gerarLinksUsuario(usuario));
  }

  async delete(req, res) {
    const id = req.params.id;
    const row = await UsuarioRepository.delete(id);

    if (row.affectedRows === 0) {
      throw new NotFoundError(`Usuario com id ${id} não existe.`)
    }

    res.status(204).send();
  }
}
export default new UsuarioController();
