const { response } = require('express');
const database = require('../models');

class NivelController {
    static async pegaTodosOsNiveis(req, res){
        try{
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        }catch (error){
            return res.status(500).send({message: `Erro ao consultar a tabela Niveis! ${error}`})
        };
    };

    static async pegaUmNivel(req, res){
        const {id} = req.params
        try{
            const umNivel = await database.Niveis.findOne(
                {
                    where: {id: Number(id)}
                });
                return res.status(200).json(umNivel)
        }catch (error){
            return res.status(500).send({message: `Erro ao consultar a tabela Niveis! ${error}`})
        }
    }

    static async criaNivel(req, res){
        const novoNivel = req.body
        try{
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        }catch (error){
            return res.status(500).send({message: `Erro ao Cadastrar novo Nivel! ${error}`})
        }
    }

    static async atualizaNivel(req, res){
        const {id} = req.params
        const novasinfos = req.body
        try{
            await database.Niveis.update(novasinfos, {where: {id: Number(id)}})
            const nivelAtualizada = await database.Niveis.findOne({where: {id: Number(id)}})
            return res.status(200).json(nivelAtualizada)
        }catch (error){
            return res.status(500).send({message: `Erro ao Atualizar Nivel! ${error}`})
        }
    }

    static async DeletaNivel(req, res){
        const {id} = req.params
        try{
            await database.Niveis.destroy({where: {id: Number(id)}})
            res.status(200).send({message: `Registro de id: ${id}, deletado com sucesso `})
        }catch (error){
            return res.status(500).send({message: 'Erro ao Deletar  o pacientes!'})
                .json(error.message)
        }
    }
}

module.exports = NivelController