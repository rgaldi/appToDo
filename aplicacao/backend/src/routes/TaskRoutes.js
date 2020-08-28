const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const { modelName, model } = require('../model/TaskModel');
const TaskValidation = require('../middlewares/TaskValidation');

//criando a rota para atualizar e utilizando o TaskValidation para validar se os campos obrigatorios estao preenchidos para depois executar o Taskcontroller.create
router.post('/', TaskValidation, TaskController.create);

//criando a rota para realizar o update em uma tarefa
router.put('/:id', TaskValidation, TaskController.update);

//criando a rota para visualizar uma tarefa por id
router.get('/:id', TaskController.show);

//criando a rota para deletar uma tarefa pelo id
router.delete('/:id', TaskController.delete);

//criando a rota para alterar o valor de concluido
router.put('/:id/:done', TaskController.done);

//criando a rota para listar todas as tarefas
router.get('/filter/all/:macaddress',  TaskController.all);

//criando a rota para listar todas as tarefas atrasadas
router.get('/filter/late/:macaddress',  TaskController.late);

//criando a rota para listar todas as tarefas do dia atual
router.get('/filter/today/:macaddress',  TaskController.today);

//criando a rota pra listar todas as tarefas da semana
router.get('/filter/week/:macaddress',  TaskController.week);

//criando a rota para listar todas as tarefas do mes
router.get('/filter/month/:macaddress',  TaskController.month);

//criando a rota para listar todas as tarefas do ano
router.get('/filter/year/:macaddress',  TaskController.year);

module.exports = router;