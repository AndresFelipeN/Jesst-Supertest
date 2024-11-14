// Las rutas se comunican con el controlador

var usuariosController = require('./api/controladores/usuariosController.js').usuariosController


app.post('/usuarios/guardar', function(request,response){
    //acontinucacion vamos a usar la funcion
    usuariosController.guardar(request, response)
      
})

app.post('/usuarios/actualizar', function(request,response){
    //acontinucacion vamos a usar la funcion
    usuariosController.actualizar(request, response)
})

app.post('/usuarios/eliminar', function(request,response){
    //acontinucacion vamos a usar la funcion
    usuariosController.eliminar(request, response)
      
})
  
app.post('/usuarios/listar', function(request,response){
    //acontinucacion vamos a usar la funcion
    usuariosController.listar(request, response)
})

app.post('/usuarios/listarId', function(request,response){
    //acontinucacion vamos a usar la funcion
    usuariosController.listarId(request, response)
})
                         
app.post('/usuarios/login', function(request,response){
    //acontinucacion vamos a usar la funcion
    usuariosController.login(request, response)
      
})

