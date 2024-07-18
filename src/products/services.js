const { ObjectId } = require("mongodb"); 
//se usara para la consulta por id



//se llama a la base de datos
const { Database } = require("../database/index.js");

const {ProductsUtils}= require('./utils');

//colección de datos - declarada como constante
const COLLECTION = "products";



//traera todos los datos de la base de datos
const getAll = async () => {
  const collection = await Database(COLLECTION); //se llama la constante COLLECTION
  //metodo find, se utilizará to Array para pasar el resultado a una cadena
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  //realizar busquedas con base en el id del producto
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) }); //consulta para realizar la busqueda, buscando por id
};


/**
 * update
 */
const update = async (id) => {
  //realizar busquedas con base en el id del producto
  const collection = await Database(COLLECTION);

  //consulta para realizar la busqueda, buscando por id
  return collection.findOne({ _id: new ObjectId(id) });
   
};



/**
 * delete
 */
const deleteProduct = async (id) => {
 try {
   //realizar busquedas con base en el id del producto
   const collection = await Database(COLLECTION);
   const eliminado = await collection.findOneAndDelete({ _id: new ObjectId(id) });
   return eliminado.value;
 } catch (error) {
    debug(error);
    Response.error(res);
    throw new Error('Error eliminando el producto');
 }
}



//crear nuevos productos en la base de datos
const create = async (product)=>{
    const collection = await Database(COLLECTION);
    //almacenar lo que retorne collection.insertOne
    let result = await collection.insertOne(product);//esto mostrara el id en terminal dentro del programa postman posterior a la inseción del registro 
    return result.insertedId;//aqui se devolvera el identificador del objeto que se acaba de crear
}

const generateReport = async (name,res)=>{
  let products = await getAll(); 
  //como es asincrono se usa async y awai y se llama a los productos directamente con getAll para no generar más funciones y reutilizar código.
  ProductsUtils.excelGenerator(products, name, res);
}

//servicio que se va a comunicar con la db y traera los datos para exponerse en el controlador
module.exports.ProductsService = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  generateReport,
};
