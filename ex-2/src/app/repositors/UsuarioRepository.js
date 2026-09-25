import { consulta } from "../databases/conection.js"
class UsuarioRepository{
    save(data){
        const sql = "INSERT INTO usuarios SET ?"
        return consulta(sql, data, "Falha ao criar Usuario")
    }

    findById(id){
        const sql = "SELECT * FROM usuarios WHERE id=?"
        return consulta(sql, id, `Falha ao buscar usuario com id ${id}`)
    }

    findAll(){
        const sql = "SELECT * FROM usuarios"
        return consulta(sql, [], "Falha ao buscar usuarios")
    }

    update(data, id){
        const sql = "UPDATE usuarios SET ? WHERE id=?"
        return consulta(sql, [data, id], `Falha em atualizar o usuario com id ${id}`)
    }

    delete(id){
        const sql = "DELETE FROM usuarios WHERE id=?"
        return consulta(sql, id, `Falha em deletar o usuario com id ${id}`)
    }

    async findAllPaginated(page = 1, limit = 10){
        const offset = (page - 1) * limit

        const sqlData = "SELECT * FROM usuario LIMIT ? OFFSET ?"
        const sqlCount = "SELECT COUNT(*) AS total FROM usuarios"

        const data = await consulta(sqlData, [limit, offset], "Falha ao buscar usuários paginados")
        const countResult = await consulta(sqlCount, [], "Falha ao contar total de usuários") 

        const total = countResult[0].total

        return {
        data,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
    };
    }
}

export default new UsuarioRepository()