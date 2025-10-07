const { sql, getConnection } = require("../config/db");

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
    }

}

const clienteModel = {
    // -------------------------------
    // BUSCAR TODOS OS CLIENTES
    // -------------------------------
    buscarClientes: async () => {
        try {
    
            const pool = await getConnection(); // Cria um conjunto de conexões com o BD
            let sql = 'SELECT * FROM Clientes'; //seleciona os dados da tabela Clientes
    
            const result = await pool.request().query(sql);
    
            return result.recordset; //cria uma lista de clientes que vem como tabela e transforma em json
    
        } catch (error) {
            console.error('Error ao buscar clientes:', error);
            throw error;// passa o erro para o controller tratar
        }
    },
    
    // -------------------------------
    // INSERIR NOVOS CLIENTES
    // -------------------------------
    inserirCliente: async (nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();
    
            let querySQL = 'INSERT INTO Clientes(nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)';//@ para chamar a variável
    
            await pool.request()//requisição ao banco de dados
                .input('nomeCliente', sql.VarChar(100), nomeCliente) //nome do input nomeClietes, irá armazenar um dado tipo varchar e a variável é nomeCliente
                .input('cpfCliente', sql.Char(14), cpfCliente)//nome do input cpfClietes, irá armazenar um dado tipo char e a variável é cpfCliente
                .query(querySQL) //aquisição
    
        } catch (error) {
            console.error('Erro ao inserir produto:', error);
            throw error; //passa o erro para o controller tratar
        }
    }

}

module.exports = { produtoModel, clienteModel }

//async function teste(){
    //const produtos = await produtoModel.buscarTodos();
    //console.log(produtos);
//}
//teste();