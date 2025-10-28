const { Transaction } = require("mssql");
const { sql, getConnection } = require("../config/db");

const pedidoModel = {
    /**
     * Busca todos os pedidos e seus respectivos itens no banco de dados
     * 
     * @async
     * @function buscarTodos
     * @returns {Promise<Array>} Retorna uma lista com todos os pedidos e seus itens
     * PROMISE: promete retornar o valor, seja erro ou não
     * @throws Mostra no console e propaga o erro caso a busca falhe
     */
    //----------------
    //BUSCAR PEDIDOS
    //----------------
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); //cria a conexão
            const querySQL = `
            SELECT 
                CL.nomeCliente,
                PD.dataPedido,
                PD.statusPagamento,
                PR.nomeProduto,
                IT.qtdItem
            
            FROM Pedidos PD
                INNER JOIN Clientes CL
	            ON CL.idCliente = PD.idPedido
	
	            INNER JOIN ItemPedido IT
	            ON IT.idPedido = PD.idPedido
	
	            INNER JOIN Produtos PR
	            ON PR.idProduto = IT.idProduto
            `;

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar pedido", error);
            throw error;
        }
    },

    //----------------
    //INSERIR PEDIDOS
    //----------------
    inserirPedidos: async (idCliente, dataPedido, statusPagamento, { itens }) => {
        //{itens} realiza a desestruturação do objeto itens
        //tem que ser antes do try catch, porque se alguma das operações der errado, o trycatch captura o erro e faz um roll back
        const pool = await getConnection();

        const transaction = new sql.Transaction(pool);
        await transaction.begin(); //aguardar e inicio a transação

        try {
            //tem que ser uma variável pois ela vai mudar depois
            //OUTPUT INSERTED.idPedidos: salva em uma tabela temporaria e devolve, antes de ser inserido na verdadeira tabela
            let querySQL = `
            INSERT INTO Pedidos(idCliente, dataPedido, statusPagamento)
            OUTPUT INSERTED.idPedidos 
            VALUES (@idCliente), @dataPedido, @statusPagamento
            `

            //uma request a partir da transação
            const result = await transaction.request()
            .input('idCliente', sql.UniqueIdentifier, idCliente)
            .input('dataPedido', sql.Date, dataPedido)
            .input('statusPagamento', sql.Bit, statusPagamento)
            .query(querySQL);

            const idPedido = result.recordset[0].idPedido; //devolve uma lista, uma array. O primeiro item no array é 0]
            
            //cada item de uma lista de itens, vai pegar um por um até terminar de executar tudo que precisa
            for (const item of itens) {
                //desestruturação
                const {idProduto, qtdItem} = item;

                querySQL = `
                    INSERT INTO ItemPedido (idPedido, idProduto, qtdItem)
                    VALUES (@idPedido, @idProduto, @qtdItem)
                `

                await transaction.request()
                .input('idPedido', sql.UniqueIdentifier, idPedido)
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .input('qtdItem', sql.Int, qtdItem)
                .query(querySQL);
            }

            await transaction.commit(); //confirma a transação (salva tudo no banco)

        } catch (error) {
            await transaction.rollback(); //desfaz tudo caso dê errado
            console.error('Erro ao inserir pedido:', error);
            throw error;

        }
    }

};

module.exports = { pedidoModel };