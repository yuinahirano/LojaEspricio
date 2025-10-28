const { VarChar } = require("mssql");
const { sql, getConnection } = require("../config/db");
const { request } = require("express");

//objeto com as funções
const produtoModel = {
    // -------------------------------
    // BUSCAR TODOS OS PRODUTOS
    // -------------------------------
    buscarTodos: async () => {
        try {

            const pool = await getConnection(); // Cria um conjunto de conexões com o BD
            let sql = 'SELECT * FROM Produtos'; //seleciona os dados da tabela Produtos

            const result = await pool.request().query(sql);

            return result.recordset; 

        } catch (error) {
            console.error('Error ao buscar produtos:', error);
            throw error;// passa o erro para o controller tratar
        }
    },

    // -------------------------------
    // BUSCAR UM produto
    // -------------------------------
    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();//faz uma conexão

            //pega da tabela de produtos, a coluna de id de produtos
            const querySQL = 'SELECT * FROM Produtos WHERE idProduto = @idProduto';

            //
            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar o produto', error);
            throw error; //passa o erro para o controller
        }
    },

    // -------------------------------
    // INSERIR NOVOS PRODUTOS
    // -------------------------------

    inserirProduto: async (nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Produtos(nomeProduto, precoProduto) VALUES(@nomeProduto, @precoProduto)';//@ para chamar a variável

            await pool.request()//requisição ao banco de dados
                .input('nomeProduto', sql.VarChar(100), nomeProduto) //criar o nome da input, o tipo de dado que ela irá armazenar e o tipo da variável
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL) //aquisição

        } catch (error) {
            console.error('Erro ao inserir produto:', error);
            throw error; //passa o erro para o controller tratar
        }
    },

    // -------------------------------
    // ATUALIZAR PRODUTOS
    // -------------------------------

    //update NUNCA é usado sem where, pois senão atualiza todos dados
    //para atualizar um produto especifico
    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            //sintaxe do comando update
            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `
            //SET faz o setup

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao atualizar produtos:', error);
            throw error;
        }

    },

    // -------------------------------
    // DELETAR PRODUTOS
    // -------------------------------

    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = 'DELETE FROM Produtos WHERE idProduto = @idProduto';

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            throw error;
        }
    },

}


module.exports = { produtoModel }

//async function teste(){
    //const produtos = await produtoModel.buscarTodos();
    //console.log(produtos);
//}
//teste();