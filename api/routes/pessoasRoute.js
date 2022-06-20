const { Router } = require('express');
const PessoasController = require('../controlers/PessoaController.js');



const router = Router();

router.get('/pessoas', PessoasController.pegaTodasAsPessoas)
    .get('/pessoas/:id', PessoasController.pegaUmaPessoa)
    .post('/pessoas', PessoasController.criarPessoa)
    .put('/pessoas/:id', PessoasController.atualizaPessoa)
    .delete('/pessoas/:id', PessoasController.DeletaPessoa)
    .get('/pessoas/:id/matriculas/:matriculaId', PessoasController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/turmas/:turmaId/matriculas', PessoasController.criarMatricula)

module.exports = router