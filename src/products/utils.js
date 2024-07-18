const excelGenerator = (products,name,res)=>{
    const xl = require('excel4node');

    products = products.map((product)=>{
        let id = product._id.toString();
        delete  product._id;
        return{
            id,
            ...product//se llama al contenido dentro del producto, modo simplificado con tres puntos
            
        }
    })
    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('inventario');

    //primer for para la parte de las filas dentro del archivo de excel
    for (let i = 1; i <= products.length; i++) {
       //segundo for para las columnas dentro del archivo de excel
       for (let j = 1; j <= Object.values(products[0]).length; j++) {
       //almacenar los datos en cada una de las celdas
       let data = Object.values(products[i-1])[j-1];
       //aqui se obtendra el primer elemento de la fila, en el segundo array que va dentro de [j] restando menos uno para que nos de el primer elemento
        /**
         * la dependencia excel4node necesita que se declare que tipo de valores se mandaran al arreglo por lo que se hará lo siguiente:
        */
       if (typeof data === 'string')  {
        ws.cell(i,j).string(data);
       }else{
        ws.cell(i,j).number(data);
       }
        
       }
    }
        wb.write(`${name}.xlsx`,res);
        //aqui va guardarse el archivo con el nombre que recibe en la variable al inicio del response, se le coloca la extensión que en este caso será xlsx
}
//se va a exportar
module.exports.ProductsUtils= {
    excelGenerator,
}