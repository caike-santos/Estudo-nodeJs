import RoupaRepository from "../repositors/RoupaRepository.js";
import {
  gerarLinksRoupa,
  gerarLinksPaginacao,
} from "../helpers/helperHateoas.js";

class RoupaController{
async index(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { data, total, totalPages } = await RoupaRepository.findAllPaginated(
      page,
      limit,
    );

    const roupasComLinks = data.map((roupa) => gerarLinksRoupa(roupa));

    const linksPaginacao = gerarLinksPaginacao(
      "/roupas",
      page,
      limit,
      totalPages,
    );

    res.setHeader("cache-control", "public, max-age=60, must-revalidate");

    res.status(200).json({
      data: roupasComLinks,
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
    const row = await RoupaRepository.save(data);
    const id = row.insertId;

    const novaRoupa = { id: id, ...data };
    const roupasComLinks = gerarLinksRoupa(novaRoupa);

    res.setHeader("Location", `/roupas/${id}`);
    res.status(201).json(roupasComLinks);
  } catch (erro) {
    res.status(500).json({ title: "Erro interno", detail: erro.message });
  }
}

async show(req, res) {
  try {
    const id = req.params.id;
    const row = await RoupaRepository.findById(id);

    if (!row || row.length === 0) {
      return res.status(404).json({
        title: "Não Encontrado",
        detail: `Roupa com id ${id} não existe.`,
      });
    }

    const roupa = row[0] || row
    const roupasComLinks = gerarLinksRoupa(roupa)

    res.setHeader("Cache-Control", "public, max-age=30, must-revalidate");
    res.status(200).json(roupasComLinks)
  } catch (erro) {
     return res.status(500).json({ title: "Erro interno", detail: erro.message });
  }
}

async update(req, res) {
    try{
        const data = req.body
        const id = req.params.id
        const row = await RoupaRepository.update(id, data)

        const atualizado = await RoupaRepository.findById(id)
        const roupa = atualizado[0] || atualizado

        res.status(200).json(gerarLinksRoupa(roupa))

    }catch(erro){
        return res.status(500).json({ title: "Erro interno", detail: erro.message });
    }
}

async delete(req, res) {
    try{
        const id = req.params.id
        const row = await RoupaRepository.delete(id)

        res.status(204).send()
    }catch(erro){
        return res
        .status(500)
        .json({ title: "Erro Interno", detail: erro.message });
    }
}
}

export default new RoupaController()