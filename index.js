require('dotenv').config()
const http = require('http')

function requestController() {
    console.log('Bienvenidos al curso')
}

const server = http.createServer(requestController)

const PORT = process.env.PORT

server.listen(PORT, function() {
    console.log("Aplicacion corriendo en: " + PORT)
})