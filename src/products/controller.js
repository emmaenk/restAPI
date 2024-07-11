const debug = require('debug')('app:module-products-Controller');


//importar servicios, desestructurando
const {ProductsService} = require('./services');


module.exports.ProductsController={
     //responde la lista completa de todos los productos
     getProducts: async (req,res)=>{
          try{
               let products = ProductsService.getAll();//al ser asincrono se tratara como promesa
               res.json(products);
          }catch(error){
               debug(error);
               res.status(500).json({message: "Internal Server Error"})
          }
     },//lista toda la lista de productos

     getProduct: (req,res)=>{},//lista solo un producto y sus datos

     //da de alta un nuevo producto
     createProducts: async (req,res)=>{
          try {
               const {body} = req;
               const insertedId = await ProductsService.create(body);
               res.json(insertedId);
          } catch (error) {
               debug(error);
               res.status(500).json({message: "Internal Server Error"})
          }
     },
    
};
