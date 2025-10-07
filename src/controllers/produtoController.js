const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    //---------------
    //LISTAR TODOS OS PRODUTOS
    //Get /produtos
    //---------------
    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar produtos', error);
            res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
    },

    //---------------
    //CRIAR UM NOVO PRODUTO
    //POST /produtos
    //---------------

    /*
    Registro da API
        {
            "nomeProduto": "valor",
            "precoProduto": 0.00
        }
    */
   
    criarProduto: async (req, res) => {
        try {
            const { nomeProduto, precoProduto } = req.body; //body é de onde vem os dados solicitados

            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({error: 'Campos obrigatórios não preenchidos!'});
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto); //await pois o processo pode demorar

            res.status(201).json({message: 'Produto cadastrado com sucesso!'});

        } catch (error) {
            console.error('Erro ao cadastrar o produto:',error);
            res.status(500).json({erro: 'Erro no servidor ao cadastrar o produto!'});
        }
    }

}


module.exports = { produtoController};