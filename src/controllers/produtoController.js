const { produtoModel } = require("../models/produtoModel");

const produtoController= {
    //---------------
    //Listar todos os produtos
    //Get /produtos
    //---------------
    listarProdutos: async(req, res)=>{
        try {
            const produtos = await produtoModel.buscarTodos();
            
            res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar produtos', error);
            res.status(500).json({message: 'Erro ao buscar produtos.'});
        }
    }
}

module.exports = {produtoController};