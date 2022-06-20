const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoutes.js')
const turmas = require('./turmasRoutes.js')
const matriculas = require('./matriculasRoutes.js')

module.exports = app => {
    
    app.use(bodyParser.json())
    app.use(pessoas, niveis, turmas, matriculas)
    app.get('/', (req, res) =>{
        res.send('olá!')
    })

    
}