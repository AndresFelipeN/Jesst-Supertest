//Dos variables se extraen del paquete
const { test, beforeEach} = require('test')
global.config = require('../../config.js').config
//Contastntes super test
const request = require('supertest')


//Elemento que hace la peticion

//describe, titulo que agrupa todo lo que se va trabajar
describe('Grupo de testing para usuarios', (done) => {

    beforeEach(async () => {
        //Antes de cada prueba
    })

    it ('Guardar usuario sin nombre debe fallar', (done) => {

        request('http://localhost:3000')
        .post('/usuarios/guardar')
        .send({email:'felipegonnzalez@hotmail.com',password:'12345',apellidos:'Noguera'})
        .then(response => {
            console.log(response.body)
            //la respuesta del back end debe coincidir con lo que esperamos en la seccion de abajo 
           expect(response.body).toEqual({state:false,mensaje:"el campo nombre es obligatorio"})
           done()
        })
   })

   //Adicional en el package.json se debe en la secion de "test": ponemos "jest"


    it ('Guardar usuario sin email debe fallar', (done) => {
        request('http://localhost:3000')
        .post('/usuarios/guardar')
        .send({nombre:'Andres Felipe',password:'12345',apellidos:'Noguera'})
        .then(response => {
           //la respuesta del back end debe coincidir con lo que esperamos en la seccion de abajo 
           expect(response.body).toEqual({state:false,mensaje:"el campo email es obligatorio"})
           done()
        })
    })

    it ('Guardar usuario sin password debe fallar', (done) => {

        request('http://localhost:3000')
        .post('/usuarios/guardar')
        .send({nombre:'Andres Felipe',email:'felipegonnzalez@hotmail.com',apellidos:'Noguera'})
        .then(response => {
            //la respuesta del back end debe coincidir con lo que esperamos en la seccion de abajo 
           expect(response.body).toEqual({state:false,mensaje:"el campo password es obligatorio"})
           done()
        })
    })

    it ('Guardar usuario sin apellidos debe fallar', (done) => {

        request('http://localhost:3000')
        .post('/usuarios/guardar')
        .send({nombre:'Andres Felipe',email:'felipegonnzalez@hotmail.com',password:'12345'})
        .then(response => {
            //la respuesta del back end debe coincidir con lo que esperamos en la seccion de abajo 
           expect(response.body).toEqual({state:false,mensaje:"el campo apellidos es obligatorio"})
           done()
        })
    })

    it ('Guardar usuario con todos los datos, erroneo si ya existe', (done) => {

        request('http://localhost:3000')
        .post('/usuarios/guardar')
        .send({nombre:'Andres Felipe',apellidos:'Noguera',email:'felipegonnzalez@hotmail.com',password:'12345'})
        .then(response => {
            //la respuesta del back end debe coincidir con lo que esperamos en la seccion de abajo 
           expect(response.body).toEqual({state:true,mensaje:"usuario guardado"})
           done()
        })
    })

    it ('Guardar usuario con todos los datos, correcto si no existe', (done) => {

        request('http://localhost:3000')
        .post('/usuarios/guardar')
        .send({nombre:'Andres Felipe',apellidos:'Noguera',email:'felipegonnzalez@hotmail.com',password:'12345'})
        .then(response => {
            //la respuesta del back end debe coincidir con lo que esperamos en la seccion de abajo 
           expect(response.body).toEqual({state:false,mensaje:"el email ya esta registrado"})
           done()
        })
    })

    

})