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
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); //cria a conexão
            const querySQL = `
            SELECT 
                CL.nomeCliente,
                PD.dataPedido,
                PD.statusPagamento,
                PR.nomeProduto,
                IT.qtdPedido
            
            FROM Pedidos PD
                INNER JOIN Clientes CL
	            ON CL.idCliente = PD.idPedido
	
	            INNER JOIN ItemPedido IT
	            ON IT.idPedido = PD.idPedido
	
	            INNER JOIN Produtos PR
	            ON PR.idProduto = IT.idProduto
            `;

            const result = await pool.request()
                .query();

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar pedido", error);
            throw error;
        }
    }
}

module.exports = { pedidoModel };