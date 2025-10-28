const { pedidoModel } = require('../models/pedidoModel');
const { clienteModel } = require('../models/clienteModel')
const { produtoModel } = require('../models/produtoModel')

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
    //---------------------
    //LISTAR os pedidos
    //---------------------
    listarPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.buscarTodos();

            res.status(200).json(pedidos)

        } catch (error) {
            console.error('Erro ao listar pedido:', error);
            res.status(500).json({ error: 'Erro interno no servidor ao listar pedidos!' });
        }
    },

    //---------------------
    //CRIAR um NOVO pedido
    //---------------------
    criarPedidos: async (req, res) => {
        try {
            
            const {idCliente, dataPedido, statusPagamento, itens} = req.body;

            if (idCliente === undefined || dataPedido === undefined || statusPagamento === undefined || itens.length < 1) {
                return res.status(400).json({error: 'Campos obrigatórios não preenchidos!'});
            }

            //verifica o id do cliente
            if (idCliente.length != 36) {
                return res.status(400).json({error: 'Id do cliente inválido!'});
            }

            const cliente = await clienteModel.buscarUm(idCliente);
            
            //verifica se o cliente existe, dados fora dos itens
            if (!cliente || cliente.length != 1) {
                return res.status(404).json({error: 'Cliente não encontrado!'})
            }
            
            //verifica se o cliente existe, dados dentro dos itens
            for (const item of itens) {
                const {idProduto, qtdItem} = item;
                
                if (idProduto === undefined || qtdItem === undefined) {
                    return res.status(400).json({error: 'Campos obrigatórios não preenchidos!'});
                }
                
                if (idProduto.length != 36) {
                    return res.status(400).json({error: 'Id do produto inválido!'});
                }
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length != 1) {
                return res.status(404).json({error: 'Produto não encontrado.'})
            }

            await pedidoModel.inserirPedidos(idCliente, dataPedido, statusPagamento, [itens]);

            res.status(201).json({message: 'Pedido cadastrado com sucesso!'})
            

        } catch (error) {
            console.error('Erro ao cadastrar o pedido', error);
            res.status(500).json({error: 'Erro interno no servidor ao cadastrar pedido!'});
        }
    }
}

module.exports = { pedidoController };