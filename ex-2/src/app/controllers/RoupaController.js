import RoupaRepository from "../repositors/RoupaRepository.js";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";
import {
  gerarLinksRoupa,
  gerarLinksPaginacao,
} from "../helpers/helperHateoas.js";

class RoupaController{
async index(req, res) {
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
}

async create(req, res) {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError(`Nenhum dado foi enviado.`)
  }
  const row = await RoupaRepository.save(data);
  const id = row.insertId;

  const novaRoupa = { id: id, ...data };
  const roupasComLinks = gerarLinksRoupa(novaRoupa);

  res.setHeader("Location", `/roupas/${id}`);
  res.status(201).json(roupasComLinks);
}

async show(req, res) {
  const id = req.params.id;
  const row = await RoupaRepository.findById(id);

  if (!row || row.length === 0) {
    throw new NotFoundError(`Roupa com id ${id} não existe.`)
  }

  const roupa = row[0] || row
  const roupasComLinks = gerarLinksRoupa(roupa)

  res.setHeader("Cache-Control", "public, max-age=30, must-revalidate");
  res.status(200).json(roupasComLinks)
}

async update(req, res) {
    const data = req.body
    if (!data ||Object.keys(data).length === 0) {
      throw new BadRequestError(`Nenhum dado foi enviado.`)
    }
    const id = req.params.id
    const row = await RoupaRepository.update(id, data)

    if (row.affectedRows === 0) {
      throw new NotFoundError(`Roupa com id ${id} não existe.`)
    }

    const atualizado = await RoupaRepository.findById(id)
    const roupa = atualizado[0] || atualizado

    res.status(200).json(gerarLinksRoupa(roupa))
}

async delete(req, res) {
    const id = req.params.id
    const row = await RoupaRepository.delete(id)

    if (row.affectedRows === 0) {
      throw new NotFoundError(`Roupa com id ${id} não existe.`)
    }

    res.status(204).send()
}
}

export default new RoupaController()