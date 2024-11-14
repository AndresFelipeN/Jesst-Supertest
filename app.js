const express = require ("express")
global. app = express ()
const mongoose = require('mongoose')
global.config = require ('./config.js').config

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta)=>{
    //console.log(respuesta)
    console.log("conexion correcta a mongo")
    //captura de error

}).catch((error)=> {
    console.log(error)
})






require ('./rutas.js')

//Conectarse a pagina web 
app.use('/',express.static(__dirname + '/web'))

app.listen(3000, function(){
    console.log("servidor funcionando por el puerto 3000")
})