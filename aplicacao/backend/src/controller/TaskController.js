const TaskModel = require('../model/TaskModel');
const current = new Date();
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns');

class TaskController {


    //criando uma funcao assincrona, para que eu possa utilizar o await
    async create(req, res){

        //criando uma TaskModel, pegando oos valores da requisicao com o req.body
        const task = new TaskModel(req.body);

        await task.save()
                  .then(response => {
                      return res.status(200).json(response);
                  })
                  .catch(error => {
                      return res.status(500).json(error);
                  });
                  
    }

    //criando a funcao de update assincrona
    async update(req, res){

        //utilizando findOneAndUpdate para listar uma unica tarefa, passando por parametro o ID da trarefa, todo o corpo da requisicao e new:true para retornar a tarefa atualizada
        await TaskModel.findOneAndUpdate({'_id' : req.params.id}, req.body, { new : true })
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        });
    }

    //criando funcao para listar todas as tarefas
    async all(req, res){


        //utilizando o find passando o macaddress por parametro e utilizando o $in (operador do banco de dados), para buscar pelo macaddress
        await TaskModel.find({ macaddress: { '$in': req.params.macaddress }})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    //criando a funcao para mostrar uma tarefa apenas
    async show(req, res){

        //utilizando o findByID para pesquisar pelo id - res.params.id
        await TaskModel.findById(req.params.id)
        .then(response => {
            if(response)
                return res.status(200).json(response)
            else
                return res.status(404).json( {error: 'Tarefa não encontrada!'} )
        })
        .catch(error => {
            return res.status(500).json(error)
        });
    }

    //criando a funcao para deletar uma tarefa
    async delete(req, res){

        //utilizando o deleteOne, passando o id como parametro para o banco de dados
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //criando a funcao para alterar o status concluido
    async done(req, res){

        //utilizando o findByIdAndUpdate passando o ID e o Done como paramentros, para a atualizar, na URL colocar TRUE ou FALSE para atualizar se está concluida ou não
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id}, {'done': req.params.done}, {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //criando a funcao para listar as tarefas atrasadas.
    async late(req, res){

        //Utilizando o find para encontrar no banco de dados as tarefas atrasadas, current foi declarado nas primeiras linhas para pegar a data atual
        await TaskModel.find({'when' : {'$lt': current}, 'macaddress' : {'$in' : req.params.macaddress}})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    //criando a funcao para listar as tarefas do dia
    async today(req, res){

        // usando o find (operacao do mongoDB), passando o macadrress( where macaddress = valor) e a data (between inicio da data atual and final da data atual) para consulta no banco
        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte': startOfDay(current), '$lte' : endOfDay(current)}
    
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //criando a funcao para listar as tarefas da semana
    async week(req, res){

        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte': startOfWeek(current), '$lte' : endOfWeek(current)}
    
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //criando a funcao para listar as tarefas do mes
    async month(req, res){

        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte': startOfMonth(current), '$lte' : endOfMonth(current)}
    
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //criando a funcao para listar as tarefas do ano
    async year(req, res){

        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte': startOfYear(current), '$lte' : endOfYear(current)}
    
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }    
    
}

module.exports = new TaskController();