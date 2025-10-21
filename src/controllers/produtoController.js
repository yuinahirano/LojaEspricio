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
                return res.status(400).json({ error: 'Campos obrigatórios não preenchidos!' });
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto); //await pois o processo pode demorar

            res.status(201).json({ message: 'Produto cadastrado com sucesso!' });

        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
            res.status(500).json({ erro: 'Erro no servidor ao cadastrar o produto!' });
        }
    },

    //------------------
    //ATUALIZAR PRODUTO
    //PUT /produtos/idProduto
    //nomeProduto e precoProduto são opcionais
    //------------------

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params; //não precisa verificar se tem ou não, pois assim ele ja verifica se tem ou não
            const { nomeProduto, precoProduto } = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'Id do produto inváldo!' });
            }

            //verificar se o produto existe
            const produto = await produtoModel.buscarUm(idProduto);
            //se o produto não existe ou se tem 
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: 'Produto não encontrado.' })
            }

            //
            const produtoAtual = produto[0];

            //se
            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);
            res.status(200).json({ message: 'Produto atualizado com sucesso!' })

        } catch (error) {
            console.error('Erro ao atualizar o produto.');
            res.status(500).json({ erro: 'Erro no servidor ao atualizar produto.' })
        }
    },

    //------------------
    //DELETAR PRODUTO
    //DELETE /produtos/idProduto
    //------------------

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params; 

            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'Id do produto inváldo!' });
            }

            //verificar se o produto existe
            const produto = await produtoModel.buscarUm(idProduto);

            //se o produto NÃO existe ou se tem mais de um
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: 'Produto não encontrado.' })
            }

            await produtoModel.deletarProduto(idProduto);
            res.status(200).json({message: 'Produto deletado com sucesso!'});
            
        } catch (error) {
            res.status(500).json({error: 'Erro no servidor ao deletar o produto.'});
        }
    }


}


module.exports = { produtoController };