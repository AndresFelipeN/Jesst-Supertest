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


module.exports.usuariosController = usuariosController