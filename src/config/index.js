//trae las variables .env en el archivo requerido, para no estar utilizando requier o dotenv, se centralizara en el archivo de configuración y si necesitamos una variable de entorno en algun archivo, hacemos la petición a este archivo de configuración.
require('dotenv').config();

module.exports.Config={
    //aqui se llama la variable PORT del .env, gracias al dotenv
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME,

}   