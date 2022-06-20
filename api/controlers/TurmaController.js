const database = require('../models');

class TurmaController {
    static async pegaTodasAsTurmas(req, res){
        try{
            const pegaTurmas = await database.Turmas.findAll()
            return res.status(200).json(pegaTurmas)
        }catch (error){
            return res.status(500).send({message: `Erro ao consultar todas as turmas ${error}`})
        }
    };

    static async pegaUmaTurma(req, res){
        const {id} = req.params
        try{
            const pegaTurma = await database.Turmas.findOne({where: {id: Number(id)}})
            if(!pegaTurma){
                res.status(400).send({message: `Cadastro de Id: ${id}, não encontrado!`})
            }else{
                return res.status(200).json(pegaTurma)
            }
            
        }catch (error){
            return res.status(500).send({message: `Erro ao consultar a turma de Id: ${id},  ${error}`})
        }
    }
    static async criaTurma(req,res){
        const novasInfos = req.body
        try{
            const novaTurmaCriada = await database.Turmas.create(novasInfos)
            return res.status(200).json(novaTurmaCriada)
        }catch(error){
            return res.status(500).send({message: `Erro ao cadastrar nova turma ${error}`})
        }
    }

    static async alteraTurma(req, res){
        const {id} = req.params
        const infos = req.body
        try{
            await database.Turmas.update(infos, {where: {id: Number(id)}})
            const turmaAtualizada = await database.Turmas.findOne({where: {id: Number(id)}})
            return res.status(200).json(turmaAtualizada)
        }catch (error){
            return res.status(500).send({message: `Erro ao Atualizar ${json(infos)} de turma com Id: ${id},  ${error}`})
        }
    }

    static async deletaTurma(req, res){
        const {id} = req.params
        try{
            await database.Turmas.destroy({where: {id: Number(id)}})
            res.status(200).send({message: `Registro de id: ${id}, deletado com sucesso `})
        }catch (error){
            return res.status(500).send({message: 'Erro ao Deletar a turma!'})
            .json(error.message)
        }
    }
}

module.exports = TurmaController