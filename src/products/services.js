const { ObjectId } = require("mongodb"); //se usara para la consulta por id

//se llama a la base de datos
const { Database } = require("../database/index.js");

//colección de datos - declarada como constante

const COLLECTION = "products";

//traera todos los datos de la base de datos
const getAll = async () => {
  const collection = await Database("COLLECTION"); //se llama la constante COLLECTION
  //metodo find, se utilizará to Array para pasar el resultado a una cadena
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  //realizar busquedas con base en el id del producto
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: ObjectId(id) }); //consulta para realizar la busqueda, buscando por id
};


//crear nuevos productos en la base de datos
const create = async (product)=>{
    const collection = await Database(COLLECTION);
    //almacenar lo que retorne collection.insertOne
    let result = collection.insertOne(product);
    return result.insertedId;//aqui se devolvera el identificador del objeto que se acaba de crear
}

//servicio que se va a comunicar con la db y traera los datos para exponerse en el controlador
module.exports.ProductsService = {
  getAll,
  getById,
  create
};
