const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns')

// Iniciando o taskvalidation de forma assincrona(async)
const TaskValidation = async (req, res, next) => {


    //quebrando todo o corpo da requisicao
    const { macaddress, type, title, description, when } = req.body;

    //validando
    if(!macaddress)
    return res.status(400).json({ error: 'macaddress é obrigatório' })

    else if(!type)
    return res.status(400).json({ erros: 'Tipo é obrigatório'})

    else if(!title)
    return res.status(400).json({ error: 'O Título é obrigatório'})

    else if(!description)
    return res.status(400).json({ error: 'A descrição é obrigatória'})

    else if (!when)
    return res.status(400).json({ error: 'Data e Hora são obrigatórios'})

    
    else {

        let exists;

        if(req.params.id){
            exists = await TaskModel.findOne(
                {   
                    '_id': {"$ne" : req.params.id},
                    'when': {'$eq' : new Date(when)},
                    'macaddress' : {'$in' : macaddress}
                });

        }else{
            if (isPast(new Date(when))) //Verificando se a data esta no passado, utilizando o DATE-FNS
                return res.status(400).json({ error: 'Escolha uma data e hora futura'})

            exists = await TaskModel.findOne(
                { 
                    'when': {'$eq' : new Date(when)},
                    'macaddress' : {'$in' : macaddress}
                });

        if(exists){
            return res.status(400).json({ error: 'Ja existe uma tarefa neste dia e horario'})
        } 
     }
     
     next();

    }
}

module.exports = TaskValidation;