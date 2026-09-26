import UsuarioRepository from "../repositors/UsuarioRepository.js";
import {
  gerarLinksUsuario,
  gerarLinksPaginacao,
} from "../helpers/helperHateoas.js";

class UsuarioController {
  async index(req, res) {
    try {
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

      res.status(200).json({
        data: usuariosComLinks,
        meta: {
          pageCurrent: page,
          totalRecords: total,
          limitPerPage: limit,
          totalPages: totalPages,
        },
        _links: linksPaginacao,
      });
    } catch (erro) {
      res.status(500).json({ title: "Erro interno", detail: erro.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const row = await UsuarioRepository.save(data);
      const id = row.insertId;

      const novoUsuario = { id: id, ...data };
      const usuarioComLinks = gerarLinksUsuario(novoUsuario);

      res.setHeader("Location", `/usuarios/${id}`);
      res.status(201).json(usuarioComLinks);
    } catch (erro) {
      res.status(500).json({ title: "Erro Interno", detail: erro.message });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const row = await UsuarioRepository.findById(id);

      if (!row || row.length === 0) {
        return res.status(404).json({
          title: "Não Encontrado",
          detail: `Usuário com id ${id} não existe.`,
        });
      }
      const usuario = row[0] || row;
      const usuarioComLinks = gerarLinksUsuario(usuario);

      res.setHeader("Cache-Control", "public, max-age=30, must-revalidate");
      return res.status(200).json(usuarioComLinks);
    } catch (erro) {
      return res
        .status(500)
        .json({ title: "Erro Interno", detail: erro.message });
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const id = req.params.id;
      const row = await UsuarioRepository.update(data, id);

      const atualizado = await UsuarioRepository.findById(id);
      const usuario = atualizado[0] || atualizado;

      res.status(200).json(gerarLinksUsuario(usuario));
    } catch (erro) {
      return res
        .status(500)
        .json({ title: "Erro Interno", detail: erro.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const row = await UsuarioRepository.delete(id);

      res.status(204).send();
    } catch (erro) {
      return res
        .status(500)
        .json({ title: "Erro Interno", detail: erro.message });
    }
  }
}
export default new UsuarioController();
