const { pedidoModel } = require('../models/pedidoModel');

//controller é um objeto
const pedidoController = {
    /**
     * Controlador que lista todos os pedidos do banco de dados.
     * 
     * @async
     * @function listarPedidos
     * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
     * @param {object} res - Objeto da resposta do servidor (enviado ao cliente HTTP)
     * @returns {Promise<void>} - Retorna uma resposta JSON com a lista de produtos
     * Void: não tem um tipo especifíco
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os pedidos
     */
    listarPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.buscarTodos();

            res.status(200).json(pedidos)

        } catch (error) {
            console.error('Erro ao listar pedido:', error);
            res.status(500).json({ error: 'Erro interno no servidor ao listar pedidos!' });
        }
    }
}

module.exports = { pedidoController };