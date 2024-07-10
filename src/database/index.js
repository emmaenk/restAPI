/**
 * escribir cliente que nos ayude a conectarnos al servidor de mongodb
 */

// desestructuración
const { MongoClient, Collection } = require("mongodb");
//exportara la funcion que nos devuelva la funci
const debug = require("debug")("app:module-database");

//desesctructuración
const {Config}= require('.../config/index');

var connection= null;//variable de conexión global
module.exports.Database = (Collection) => new Promise((resolve, reject) => {
    try {//código asincrono con await y resolución de promesas
        if (!connection) {
            const client= new MongoClient(Config.mongoUri);//recibe parametro para conectar a la base de datos
            connection = await.client.connect();//asincrona
            //si generamos muchas conexiones el servidor se saturara
            //singleton para evitar que genere nueva conexión a cada instante, esto identifica que se utilice la misma conexión existente y no nuevas
            //se hacen todas las peticiones en la misma conexión
            debug(`nueva conexión realizada con MongoDB Atlas`);
        }
        debug("Reutilizando conexión");
        //si ya existe una conexión a la base de datos almacenar en la constante db
        const db = connection.db(Config.mongoDbname);//recibe el nombre de la base de datos de la que ya existe conexión
        resolve(db.Collection(Collection)) ;
    } catch (error) {
        reject(error);
    }
});
