import conexao from '../database/conexao.js';
import FamiliaRepository from "../repositors/FamiliaRepository.js"

class FamiliaController {
  async index(req, res) {
    const row = await FamiliaRepository.findAll()
    res.json(row)
  }

  async criar(req, res) {
    const dados = req.body
    const row = await FamiliaRepository.create(dados)
    res.json(row)
  }

  async ler(req, res) {
    const id = req.params.id;
    const row = await FamiliaRepository.findById(id)
    res.json(row)
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    const row = await FamiliaRepository.update(dados, id)
    res.json(row)
  }

  async deletar(req, res) {
    const id = req.params.id;
    const row = await FamiliaRepository.delete(id)
    res.json(row)
  }
}

export default new FamiliaController();
