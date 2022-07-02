const database = require('../models');
const Sequelize = require('sequelize')

class PessoasController {
    static async pegaPessoasAtivas(req, res) {
        try{
            const pessoasAtivas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas)
        }catch (error){
            return res.status(500).send({message: 'Erro ao consultar todos os pacientes!'})
                .json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try{
            const todasAsPessoas = await database.Pessoas.scope("todos").findAll()
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

    static async restauraPessoa(req, res){
        const {id} = req.params
        try{
            await database.Pessoas.restore({where: {id: Number(id)}})
            return res.status(200).json({messagem: `Pessoa de ID: ${id}, restaurada com sucesso --- person of ID: ${id} successfully restored `})
        }catch(error){
            return res.status(500).send({message: 'Erro ao restaura o paciente de ID:' + id})
            .json(error.message)
        }
    }

    static async DeletaPessoa(req, res){
        const {id} = req.params.id
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

    static async buscaPessoaMatriculaAtiva(req, res){
        const {estudanteId} = req.params
        try{
            const pessoa = await database.Pessoas.findOne({where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas) 
        }catch(error){
            return res.status(500).send({message: 'Erro ao pesquisar  o Matricula!'})
            .json(error.message)
        }
    }

    static async PegaMatriculasPorTurma(req, res){
        const {turmaId} = req.params
        try{
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where:{
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id','DESC']]
            })
            return res.status(200).json(todasAsMatriculas)
        }catch(error){
            return res.status(500).send({message: 'Erro ao pesquisar  o Matricula!'})
            .json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 2
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            res.status(200).json(turmasLotadas)
        }catch(error){
            return res.status(500).send({message: 'Erro ao pesquisar  o Matricula!'})
            .json(error.message)
        }
    }

    static async cancelaPessoa(req, res){
        const {estudanteId} = req.params
        try{
            database.sequelize.transaction(async t =>{
                await database.Pessoas.update({ativo: false}, {where:{id: Number(estudanteId)}}, {transaction: t})
                await database.Pessoas.update({status: 'cancelado'}, {where: {estudante_id: Number(estudanteId)}}, {transaction: t})
                res.status(200).send('Estudante Cancelado')
            })
        }catch (error){
            return res.status(500).send({message: 'Erro ao pesquisar  o Matricula!'})
            .json(error.message)
        }
    }
}

module.exports = PessoasController;