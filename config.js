var config = {
    email:{},
    sesiones:{}
}

//Data base name
config.bd = "jest&supertest"

//session, secret and expiration
config.sesiones.secret = "pure"
config.sesiones.expiracion = 60000*5

//Encryption key word
config.palabraclave = "sayud2fqwyt3dfyqwfdyf3dtb5ywdf{ytqwfqwytl4fdywqtdyqwdyt4wqv"

//aca estamos añadiendo el front end a la lista de cors para acceder al back end
config.origins = [
    "http://localhost:4200"
]

module.exports.config = config