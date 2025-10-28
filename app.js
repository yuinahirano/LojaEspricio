const express = require("express");
const app = express();
const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoute");//colocar /clienteRoute igual qundo criou o arquivo
const { pedidoRoutes } = require('./src/routes/pedidoRoutes')

const PORT = 8081;

app.use(express.json());

//rotas, configurar uma por vez
app.use('/', produtoRoutes);
app.use('/', clienteRoutes);
app.use('/', pedidoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})