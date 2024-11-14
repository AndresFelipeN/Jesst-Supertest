var usuariosController = {}
const {config}  = require('../../config.js')
var usuariosModel = require ('../modelos/usuariosModel.js').usuariosModel

usuariosController.guardar = function(request, response)
{
    var post = 
    {   nombre: request.body.nombre,
        apellidos: request.body.apellidos,
        email: request.body.email,
        password: request.body.password,
        
        
        
        
    }
  
  //Codicionales
    //Van antes del push
    if(post.nombre == null || post.nombre == undefined || post.nombre == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo nombre es obligatorio"})
        //frena el procesp
        return false
    }


    // Length nos ayuda a establecer el numero maximo de caracteres peritidos
    if(post.nombre.length > 20){
        response.json ({state:false,mensaje:"el campo nombre no debe superar 20 caracteres"})
        return false

    }

    if(post.apellidos == null || post.apellidos == undefined || post.apellidos == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo apellidos es obligatorio"})
        //frena el procesp
        return false
    }

    
    if(post.email == null || post.email == undefined || post.email == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo email es obligatorio"})
        //frena el procesp
        return false
    }

    
    //rex.text nos permite confirmr si un email es valido
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({state:false,mensaje: "el campo email no es valido"})
    }

    if(post.password == null || post.password == undefined || post.password == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo password es obligatorio"})
        //frena el proceso
        return false
    }

    post.password = SHA256(post.password + config.palabraclave) 

    

    //guardar en el modelo(modelos) se importa
    //los callback se capturan creando funciones
    // Validacion para no gurdar emails que ya existe
    usuariosModel.existeemail(post, function(res){

        if(res.existe == 'si'){
         response.json({state:false,mensaje: "el email ya esta registrado"})
         return false
        }
        else{

            usuariosModel.guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }
    })

}

usuariosController.actualizar = function (request, response){

    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        apellidos:request.body.apellidos,
        rol:request.body.rol,
        estado:request.body.estado,
        telefono:request.body.telefono,
        direccion:request.body.direccion
    }

    if(post.nombre == null || post.nombre == undefined || post.nombre == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo nombre es obligatorio"})
        //frena el procesp
        return false
    }

    if(post.apellidos == null || post.apellidos == undefined || post.apellidos == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo apellidos es obligatorio"})
        //frena el procesp
        return false
    }

    if(post.rol == null || post.rol == undefined || post.rol == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo rol es obligatorio"})
        //frena el procesp
        return false
    }

    if(post.estado == null || post.estado == undefined || post.estado == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo estado es obligatorio"})
        //frena el procesp
        return false
    }

    //se necesita el id ya que en este caso estomos haciendo busqueda por el id mongo

    if(post._id == null || post._id == undefined || post._id == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo _id es obligatorio"})
        //frena el procesp
        return false
    }

    usuariosModel.actualizar(post, function(respuesta){
        response.json(respuesta)
    })

    
}

usuariosController.eliminar = function (request, response){

    var post = {
        _id:request.body._id
        
    }


    //se necesita el id ya que en este caso estomos haciendo busqueda por el id mongo

    if(post._id == null || post._id == undefined || post._id == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo _id es obligatorio"})
        //frena el procesp
        return false
    }

    usuariosModel.eliminar(post, function(respuesta){
        response.json(respuesta)
    })

    
}

usuariosController.listar = function(request, response){
    usuariosModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
    
    
}

usuariosController.listarId = function(request, response){
    var post = {
        _id:request.body._id
    }

    if(post._id == null || post._id == undefined || post._id == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo _id es obligatorio"})
        //frena el procesp
        return false
    }
    usuariosModel.listarId(post, function(respuesta){
        response.json(respuesta)
    })
    
    
}

usuariosController.login = function(request, response){

    var post = 
    { 
        email: request.body.email,
        password: request.body.password
    }
  

    if(post.email == null || post.email == undefined || post.email == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo email es obligatorio"})
        //frena el procesp
        return false
    }

    if(post.password == null || post.password == undefined || post.password == ""){
        //Si las condiciones de arriba se cumplen el resultado es el de abajo
        response.json ({state:false,mensaje:"el campo password es obligatorio"})
        //frena el proceso
        return false
    }
    
    // Estamos incertando la contraseña ya encryptada
    post.password = SHA256(post.password + config.palabraclave) 

    //Validar login
    usuariosModel.validalogin(post, function (validacion){
        var tiempo = tiempoTranscurridoEnMinutos (validacion.fechalogin)
        console.log(tiempo)
        

        if(validacion.errorlogin < 3 ){
            //si se puede hacer log in
            usuariosModel.login(post,function(respuesta){
                if (respuesta.state == false){
                    post.cantidad = validacion.errorlogin + 1
                    usuariosModel.actualizarerrores(post, function(act){
                        response.json(respuesta)
                    })
                }
                else {
                    //Actualizar la fecha del ultimo logueo
                    usuariosModel.actualizarfechalogin(post, function(actfecha){

                    })
                    // Almacenamiento de datos sobre la tarjeta de roles
                    request.session.nombre = respuesta.data [0].nombre
                    request.session._id = respuesta.data [0]._id
                    request.session.ultimologin = respuesta.data [0].ultlogin
                    request.session.rol = respuesta.data [0].rol
                    
                    //Aca estamos bloqueando que la informacion no se muestre en en el array por la consola
                    response.json({state:true, mensaje:"Bienvenido: " + respuesta.data[0]. nombre})
                }
                
            })
        }
        else{ 
            //bloqueado
            if (tiempo < 2){
                response.json({state:false, mensaje: "Debe esperar al menos 2 minutos, Han Transcurrido:" + tiempo })
            } else {

                usuariosModel.login(post, function (respuesta){
                    post.cantidad =  0
                    usuariosModel.actualizarerrores(post, function(act){
                        response.json(respuesta)
                    })
                }) 
            }
        } 
    })

    
    
}


module.exports.usuariosController = usuariosController