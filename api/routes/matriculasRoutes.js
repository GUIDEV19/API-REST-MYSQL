const {Router} = require('express')
const MatriculaController = require('../controlers/MatriculaController.js');



const router = Router();

router.put('/matriculas/:id', MatriculaController.alteraMatricula)
    .delete('/matriculas/:id', MatriculaController.deletaMatricula)

module.exports = router