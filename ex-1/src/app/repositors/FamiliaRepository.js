import { consulta } from "../database/conexao.js"
class FamiliaRepository {
  create(dados) {
    const sql = "INSERT INTO familia SET ?";
    return consulta(sql, dados, "Erro, falha na criação")
  }
  findAll() {
    const sql = "SELECT * FROM familia;";
    return consulta(sql, "Erro, lista nao encontrada")
  }
  findById(id) {
    const sql = "SELECT * FROM familia WHERE id=?";
    return consulta(sql, id, "Erro, id nao encontrado")
  }
  update(dados, id) {
    const sql = "UPDATE familia SET ? WHERE id=?";
    return consulta(sql, [dados, id], "Erro, falha em atualizar dados")
  }
  delete(id) {
    const sql = "DELETE FROM familia WHERE id=?";
    return consulta(sql, id, "Erro, falha em deletar")
  }
}

export default new FamiliaRepository();
