const express = require('express');
const cors = require('cors');

const server = express(); //iniciando servidor
server.use(cors());
server.use(express.json()); //utilizando o express para falar que vamos utilizar json

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes)


server.listen(3001, () => {
    console.log('API ONLINE')
})