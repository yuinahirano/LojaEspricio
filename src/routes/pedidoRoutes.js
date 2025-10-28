const express = require('express');
const router = express.Router();
const { pedidoController } = require('../controllers/pedidoController');

/**
 * Define as rotas relacionadas ao s pedidos
 * 
 * @module pedidoRoutes 
 * 
 * @description
 * - GET /pedidos -> Lista todos os pedidos d banco de dados.
 * - POST /pedidos -> Cria um novo pedido e o seus itens com os dados enviados pelo cliente HTTP
 */
router.get("/pedidos", pedidoController.listarPedidos);
router.post("/pedidos", pedidoController.criarPedidos);

module.exports = {pedidoRoutes: router}