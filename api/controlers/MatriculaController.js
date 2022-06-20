const database = require('../models')

class MatriculaController {
    /* static async pegaTodasAsMatriculas(req, res){
        try{
            const todasAsMatriculas = await database.Matriculas.findAll()
            return res.status(200).json(todasAsMatriculas)
        }catch (error){
            return res.status(500).send({message: 'Erro ao consultar todas as Matriculas!'})
            .json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res){
        const {id} = req.params
        try{
            const pegaUmamatricula = await database.Matriculas.findOne({where: {id: Number(id)}})
            if(!pegaUmamatricula){
                return res.status(400).send({message: `Matrícula de ID: ${id}, não encontrada`})
            }else{
                return res.status(200).json(pegaUmamatricula)
            }
        }catch (error){
            return res.status(500).send({message: `Erro ao consultar Matricula de ID: ${id}!`})
            .json(error.message)
        }
    }; */

    static async alteraMatricula(req, res){
        const {id} = req.params
        const infos = req.body
        try{
            await database.Matriculas.update(infos,{where: {id: Number(id)}})
            const cadastroAlterado = await database.Matriculas.findOne({where: {id: Number(id)}})
            return res.status(200).json(cadastroAlterado)
        }catch (error){
            return res.status(500).send({message: `Erro ao Alterar Matricula de ID: ${id}!`})
            .json(error.message)
        }
    }

/*     static async criaMatricula(req, res){
        const novasInfos = req.body
        try{
            const novaMatricula = await  database.Matriculas.create(novasInfos)
            return res.status(200).json(novaMatricula) 
        }catch(error){
            return res.status(500).send({message: `Erro ao criar nova Matricula!`})
            .json(error.message)
        }
    } */

    static async deletaMatricula(req, res){
        const {id} = req.params
        try{
            await database.Matriculas.destroy({where: {id: Number(id)}})
            return res.status(200).send({mensagem: `Matricula de Id: ${id}, deletado com sucesso!`})
        }catch (error){
            return res.status(500).send({message: `Erro ao deletar Matricula de Id: ${id}!`})
            .json(error.message)
        }
    }
}

module.exports = MatriculaController;