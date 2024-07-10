const express = require ("express");
const debug = require ("debug")("app:main");

const { Config }= require('./src/config/index');

const app = express();
//aqui le damos la capacidad a nuestro server de recibir datos en el cuerpo de la petición o en el request 
app.use(express.json());

app.listen(Config.port, ()=>{
    debug(`servidor escuchando en el puerto ${Config.port}`);
});