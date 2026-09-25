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
        return consulta(sql, "Falha ao buscar usuarios")
    }

    update(data, id){
        const sql = "UPDATE usuarios SET ? WHERE id=?"
        return consulta(sql, [data, id], `Falha em atualizar o usuario com id ${id}`)
    }

    delete(id){
        const sql = "DELETE FROM usuarios WHERE id=?"
        return consulta(sql, id, `Falha em deletar o usuario com id ${id}`)
    }
}

export default new UsuarioRepository()