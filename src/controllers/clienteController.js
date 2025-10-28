const { clienteModel } = require("../models/clienteModel"); //buscar no cliente model

const clienteController = {
    //---------------
    //LISTAR TODOS OS CLIENTES
    //Get /clientes
    //---------------
    listarClientes: async (req, res) => {
        try {
            //query parameter para filtrar ou buscar dados sem alterar o recurso em si - tem como continuar listando todos
            const { idCliente } = req.query;

            //verifica se o id existe
            if (idCliente) {

                //verifica o tamanho do id, se contem todos os caracteres
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: 'Id do cliente inválido!' });
                }

                // consulta clientE
                let cliente = await clienteModel.buscarUm(idCliente);

                return res.status(200).json(cliente);
            }

            //consulta clientES
            const clientes = await clienteModel.buscarTodos();

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

            //verifica se o cliente escreveu o cpf no modelo certo, pois no char precisa OBRIGATORIAMENTE 14 caracteres
            //length ve o tamanho
            if (cpfCliente.length < 14) {
                return res.status(400).json({error: 'CPF inserido incorretamente! Verifique se escreveu corretamente todos os valores e se está nesse modelo: 000.000.000-00'})
            }
            
            //verifica se o cpf já existe no banco de dados/se ja foi registrado
            const clientes = await clienteModel.buscarPorCpf(cpfCliente);
            //se tiver o numero de clientes maior que zero, quer dizer que ja tem um cliente registrado com esse cpf
            if (clientes.length>0) {
                return res.status(409).json({erro: 'CPF já cadastrado!'});
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