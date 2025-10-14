
## API Reference 

### Produtos

#### GET /produtos
- **Descrição**: Obtém uma lista de produtos
- **Response**: Array de produtos

#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**:
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
- **Response**: 
```
{
    "message": 'Produto cadastrado com sucesso!'
}
```

### Clientes

#### GET /clientes
- **Descrição**: Obtém uma lista de clientes
- **Response**: Array de clientes
```
[
	{
		"idClientes": "idExemplo",
		"nomeCliente": "nomeExemplo",
		"cpfCliente": "cpfExemplo"
	}
]
```

#### POST /clientes
- **Descrição**: Cria um novo cliente
- **Body**:
```
{
    "nomeProduto": "clienteExemplo",
    "precoProduto": "cpfExemplo"
}
```
- **Response**: 
```
{
	"message": 'Cliente cadastrado com sucesso!'
}
```
