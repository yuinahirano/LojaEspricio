const{sql, getConnection} = require("../config/db");

const produtoModel = {
    buscarTodos: async ()=>{
        try {
            
        const pool = await getConnection(); // Cria conexão com o BD
        let sql = 'SELECT * FROM Produtos';

        const result = await pool.request().query(sql);

        return result.recordset;

        } catch (error) {
            console.error('Error ao buscar produtos:', error);
            throw error;// passa o erro para o controller tratar
        }
    }
}

module.exports= {produtoModel}

//async function teste(){
    //const produtos = await produtoModel.buscarTodos();
    //console.log(produtos);
//}
//teste();