const express= require('express');

const {ProductsController}=require ('./controller');

const router = express.Router();
/**
 * Nos permitirá manejar las rutas de nuestro modulo, independientemente de la aplicación
 */

module.exports.ProductsAPI=(app)=>{
    //aquí se pasara todo lo requerido  del modulo

    //se definiran las rutas de nuestro modulo CRUD - productos

    router//rutas donde se accedera via web
    .get("/",ProductsController.getProducts)//mostrara el index general - localhost:3000/api/products/
    .get("/report", ProductsController.generateReport)//se debe de coloar andes de /:id por que si no al momento de ejecutar la consulta desde postman lanzará un error 500 internal server error y así se soluciona, ya que entra primero la ruta de reports
    .get("/:id",ProductsController.getProduct)//mostrara el contenido especifico por id -localhost:3000/api/products/0000
    .post("/",ProductsController.createProducts)//dará de alta un nuevo producto
    //update
    .put("/:id",ProductsController.updateProduct)
    //delete
    .delete('/:id',ProductsController.EliminarProducto);

    app.use("/api/products",router);
    //aqui se menciona que la app utilizará route para funcionar
    /**
     * por lo que se consumiran los get y el post en la dirección /api/products, pudiendo cambiar de acuerdo al modulo
     */
}