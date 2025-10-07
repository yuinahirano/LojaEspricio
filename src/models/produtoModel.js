const{sql, getConnection} = require("../config/db");

const produtoModel = {
    buscarTodos: async ()=>{
        try {
            
        const pool = await getConnection(); // Cria um conjunto de conexões com o BD
        let sql = 'SELECT * FROM Produtos';

        const result = await pool.request().query(sql);

        return result.recordset;

        } catch (error) {
            console.error('Error ao buscar produtos:', error);
            throw error;// passa o erro para o controller tratar
        }
    },

    inserirProduto: async (nomeProduto, precoProduto)=>{
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Produtos(nomeProduto, precoProduto) VALUES(@nomeProduto, @precoProduto)';//@ para chamar a variável

            await pool.request()//requisição ao banco de dados
            .input('nomeProduto', sql.VarChar(100), nomeProduto) //criar o nome da input, o tipo de dado que ela irá armazenar e o tipo da variável
            .input('precoProduto', sql.Decimal(10,2), precoProduto)
            .query(querySQL) //aquisição

        } catch (error) {
            console.error('Erro ao inserir produto:',error);
            throw error; //passa o erro para o controller tratar
        }
    }
}

module.exports= {produtoModel}

//async function teste(){
    //const produtos = await produtoModel.buscarTodos();
    //console.log(produtos);
//}
//teste();