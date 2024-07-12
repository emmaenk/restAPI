const debug = require('debug')('app:module-products-Controller');

//importar servicios, desestructurando
const { ProductsService } = require('./services');


module.exports.ProductsController={
     //responde la lista completa de todos los productos
     getProducts: async (req, res) => {
          try {
              let products = await ProductsService.getAll(); // usar await para esperar la promesa
              res.json(products);
          } catch (error) {
              debug(error);
              res.status(500).json({ message: "Internal Server Error" });
          }
     },//lista toda la lista de productos

//lista solo un producto y sus datos
     getProduct: async (req,res)=>{

         try {
          const {params: {id}} =req;
          let product = await ProductsService.getById(id);
          res.json(product);
         } catch (error) {
          debug(error);
          res.status(500).json({ message: "Internal Server Error" });
         }
     },

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
