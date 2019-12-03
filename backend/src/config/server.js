const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({ extended: true }) )
server.use(bodyParser.json())
server.use(allowCors)

server.get('/', (req, res) => res.send('To Do App Rodando!'))
server.listen(port, () => console.log(`To-Do App rodando na porta ${port}!`))

module.exports = server