const database = require('../models');

class PessoasController {
    static async pegaTodasAsPessoas(req, res) {
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        }catch (error){
            return res.status(500).send({message: 'Erro ao consultar todos os pacientes!'})
                .json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res){
        const {id} = req.params
        try{
            const umaPessoa = await database.Pessoas.findOne(
                {
                    where: {id: Number(id)}
                })
                return res.status(200).json(umaPessoa)
        }catch (error){
            return res.status(500).send({message: 'Erro ao consultar  o pacientes!'})
                .json(error.message)
        }
    }

    static async criarPessoa(req, res){
        const novaPessoa =  req.body
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        }catch (error) {
            return res.status(500).send({message: 'Erro ao cadastrar  o pacientes!'})
                .json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const {id} = req.params
        const novasInfos = req.body
        try{
            await database.Pessoas.update(novasInfos, {where: {id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({where: {id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        }catch (error){
            return res.status(500).send({message: 'Erro ao Alterar  o pacientes!'})
                .json(error.message)
        }
    }

    static async DeletaPessoa(req, res){
        const {id} = req.params
        try{
            await database.Pessoas.destroy({where: {id: Number(id)}})
            res.status(200).send({message: `Registro de id: ${id}, deletado com sucesso `})
        }catch (error){
            return res.status(500).send({message: 'Erro ao Deletar  o pacientes!'})
                .json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res){
        const {id, matriculaId} = req.params
        try{
            const umaMatricula = await database.Matriculas.findOne(
                {
                    where: {id: Number(matriculaId),
                        estudante_id: Number(id)
                    }
                })
                return res.status(200).json(umaMatricula)
        }catch (error){
            return res.status(500).send({message: 'Erro ao consultar  o pacientes!'})
                .json(error.message)
        }
    }

    static async criarMatricula(req, res){
        const {estudanteId, turmaId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId), turma_id: Number(turmaId)}
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        }catch (error) {
            return res.status(500).send({message: 'Erro ao cadastrar  o Matricula!'})
                .json(error.message)
        }
    }
}

module.exports = PessoasController;