import { consulta } from "../databases/conection.js";

class RoupaRepository {
  save(data) {
    const sql = "INSERT INTO roupas SET ?";
    return consulta(sql, data, "Falha em criar a roupa");
  }

  findById(id) {
    const sql = "SELECT * FROM roupas WHERE id=?";
    return consulta(sql, id, `Roupa com id ${id} não encontrada`);
  }

  findAll() {
    const sql = "SELECT * FROM roupas";
    return consulta(sql, [], "Falha em listar todas as roupas");
  }

  async findAllPaginated(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const sqlData = "SELECT * FROM roupas LIMIT ? OFFSET ?";
    const sqlCount = "SELECT COUNT(*) AS total FROM roupas";

    const data = await consulta(
      sqlData,
      [limit, offset],
      "Falha em encontrar os dados das roupas",
    );
    const count = await consulta(sqlCount, [], "Falha em contar as roupas");

    const total = count[0].total;

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  update(id, data){
    const sql = "UPDATE roupas SET ? WHERE id=?"
    return consulta(sql, [data, id], `Falha em alterar a roupa de id ${id}`)
  }

  delete(id){
    const sql = "DELETE FROM roupas WHERE id=?"
    return consulta(sql, id, `Falha em deletar roupa de id ${id}`)
  }
}
