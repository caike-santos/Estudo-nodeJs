import mysql from 'mysql2'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'dbFamilia'
})

export const consulta = (sql, parametros, msgErro) => {
    return new Promise((resolve, reject) => {
      conexao.query(sql, parametros, (erro, resultado) => {
        if (erro) {
            return reject(msgErro)
        } else {
            const row = JSON.parse(JSON.stringify(resultado))
            return resolve(row)
        }
      });
    });
}

export default conexao