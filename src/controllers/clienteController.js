const { clienteModel } = require("../models/clienteModel"); //buscar no cliente model

const clienteController = {
    //---------------
    //LISTAR TODOS OS CLIENTES
    //Get /clientes
    //---------------
    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarClientes();

            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar os clientes', error);
            res.status(500).json({ message: 'Erro ao buscar os clientes.' });
        }
    },

    //---------------
    //CRIAR UM NOVO CLIENTE
    //POST /clientes
    //---------------

    /*
    Registro da API
        {
            "nomeCliente": "Fernanda Yuina",
            "cpfCliente": "123.456.789-10"
        }
    */
   
    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body; //body é de onde vem os dados solicitados

            //se o nome e o cpf do cliente não for definido: aparecer mensagem de erro
            if (nomeCliente == undefined || cpfCliente == undefined) {
                return res.status(400).json({error: 'Campos obrigatórios não preenchidos!'});
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente); //await pois o processo pode demorar

            res.status(201).json({message: 'Cliente cadastrado com sucesso!'});

        } catch (error) {
            console.error('Erro ao cadastrar o novo cliente:',error);
            res.status(500).json({erro: 'Erro no servidor ao cadastrar o novo cliente!'});
        }
    }

}


module.exports = { clienteController};