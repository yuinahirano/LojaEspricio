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
 */
router.get("/pedidos", pedidoController.listarPedidos);

module.exports = {pedidoRoutes: router}