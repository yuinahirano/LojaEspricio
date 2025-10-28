const { sql, getConnection } = require("../config/db");

//objeto cliente model
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
            throw error;// passa o erro para o controller tratar, o throw reverbera, captura o erro 
        }
    },

    // -------------------
    // BUSCAR UM cliente
    // -------------------
    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();//faz uma conexão

            //pega da tabela de produtos, a coluna de id de produtos
            const querySQL = 'SELECT * FROM Clientes WHERE idCliente = @idCliente';

            const result = await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar o cliente', error);
            throw error; //passa o erro para o controller
        }
    },


    //-------------------------------
    // BUSCAR pelos CFP dos clientes
    // -------------------------------
    buscarPorCpf: async(cpfCliente) => {
        try {
            const pool = await getConnection();
            //procurar na tabela clientes na coluna de cpf
            let querySQL = 'SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente'; //@ chama variavel

            const result = await pool.request()
            .input('cpfCliente', sql.Char(14), cpfCliente)
            .query(querySQL);

            return result.recordset;
            
        } catch (error) {
            console.error('Error ao buscar o CPF do cliente:', error);
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

module.exports = { clienteModel }
