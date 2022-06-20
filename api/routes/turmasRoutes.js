const { Router } = require('express')
const TurmaController = require('../controlers/TurmaController.js');


const router = Router();

router.get('/turmas', TurmaController.pegaTodasAsTurmas)
    .get('/turmas/:id', TurmaController.pegaUmaTurma)
    .post('/turmas', TurmaController.criaTurma)
    .put('/turmas/:id', TurmaController.alteraTurma)
    .delete('/turmas/:id', TurmaController.deletaTurma)

module.exports = router;