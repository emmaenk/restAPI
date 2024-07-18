const createError = require('http-errors');
const debug = require('debug')('app:module-products-Controller');

//importar servicios, desestructurando
const { ProductsService } = require('./services');
const { deleteProduct } = require('./services');// ruta para eliminar productos
const {Response} = require('../common/response');
const { Collection } = require('mongodb');

module.exports.ProductsController={
     //responde la lista completa de todos los productos
     getProducts: async (req, res) => {
          try {
              let products = await ProductsService.getAll(); // usar await para esperar la promesa
              //res.json(products); al ser doble respuesta mandaba error despues de ejecutar el get en el programa postman, por eso se comenta esta linea y se arregla el problema
              Response.success(res,200,'lista de productos',products);
          } catch (error) {
              debug(error);
              Response.error(res);
          }
     },//lista toda la lista de productos

//lista solo un producto y sus datos
     getProduct: async (req,res)=>{

         try {
          const {params: {id}} =req;
          let product = await ProductsService.getById(id);
          if (!product) {
               Response.error(res,new createError.NotFound());
          }else{
               //res.json(product);se comenta la linea por que se dan dos respuestas y causa que crashee el servidor, por lo que una vez comentandola, el error se subsana correctamente
               Response.success(res,200, `Producto ${id}`,product);
          }
        
         } catch (error) {
          debug(error);
          Response.error(res);
         }
     },

     //da de alta un nuevo producto
     createProducts: async (req,res)=>{
          try {
               const {body} = req;
               if (!body || Object.keys(body).length === 0) {
                    Response.error(res,new createError.BadRequest());
               }else{
                    const insertedId = await ProductsService.create(body);
                   // res.json(insertedId);// aquí se estaba mandando dobe respuesta y por ello daba error al momento de ejecutar el post dentro del programa postman
                    Response.success(res,201,'Producto creado con exito',insertedId);
               }
             
          } catch (error) {
               debug(error);
               Response.error(res);
          }
     },

     generateReport: (req, res) => {
          try {
               ProductsService.generateReport('Inventario')//aqui se define el nombre, puede ser estatico o dinamico
          } catch (error) {
               debug(error);
               Response.error(res);
          }
     },

     updateProduct: async (req,res)=>{

          try {
           const {params: {id}} =req;
           let product = await ProductsService.getById(id);
           if (!product) {
                Response.error(res,new createError.NotFound());
           }else{
                //res.json(product);se comenta la linea por que se dan dos respuestas y causa que crashee el servidor, por lo que una vez comentandola, el error se subsana correctamente
                Response.success(res,200, `Producto ${id} actualizado`,product);
           }
         
          } catch (error) {
           debug(error);
           Response.error(res);
          }
      },
     
      EliminarProducto: async (req,res)=>{
          try {
               const {params: {id}} =req;
               const deletedProduct = await ProductsService.deleteProduct(id);//mando llamar la funcion deleteProduct
               if (!deletedProduct) {
                    return res.status(404).send({ message: 'Producto no encontrado' });
               } else {
                    return res.status(200).send({ message: `Producto ${id} eliminado correctamente`, product: _id  });
               }
          } catch (error) {
               debug(error);
               Response.error(res);
          }
      }

         
};
