//ROTAS

const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

//GET /produtos -> Lista todos os produtos
router.get("/produtos", produtoController.listarProdutos);

//POST /produto -> Cria um novo produto
router.post('/produtos', produtoController.criarProduto);

//PUT /produto/idProduto -> Atualiza um produto
router.put('/produtos/:idProduto', produtoController.atualizarProduto);

//DELETE /produto/:idProduto -> Deletar um produto
router.delete('/produtos/:idProduto', produtoController.deletarProduto);


module.exports = {produtoRoutes: router};
