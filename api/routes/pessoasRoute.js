const { Router } = require('express');
const PessoasController = require('../controlers/PessoaController.js');



const router = Router();

router.get('/pessoas/:estudanteId/matriculas', PessoasController.buscaPessoaMatriculaAtiva)
    .get('/pessoas/:id', PessoasController.pegaUmaPessoa)    
    .get('/pessoas/todos', PessoasController.pegaTodasAsPessoas)
    .get('/pessoas', PessoasController.pegaPessoasAtivas)
    .get('/pessoas/matricula/:turmaId/confirmadas', PessoasController.PegaMatriculasPorTurma)
    .get('/pessoas/matricula/lotada', PessoasController.pegaTurmasLotadas)
    .post('/pessoas', PessoasController.criarPessoa)
    .post('/pessoas/:id/restaura/', PessoasController.restauraPessoa)
    .post('/pessoas/:estudandeId/cancelar', PessoasController.cancelaPessoa)
    .put('/pessoas/:id', PessoasController.atualizaPessoa)
    .delete('/pessoas/:id', PessoasController.DeletaPessoa)
    .get('/pessoas/:id/matriculas/:matriculaId', PessoasController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/turmas/:turmaId/matriculas', PessoasController.criarMatricula)

module.exports = router