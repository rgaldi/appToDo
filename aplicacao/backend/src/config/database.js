//arquivo de conexao com o banco de dados MongoDB

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo'; //url onde esta nosso banco e o nome da tabela

mongoose.connect(url, { useNewUrlParser: true}); //conexao com o banco de dados

module.exports = mongoose; 

