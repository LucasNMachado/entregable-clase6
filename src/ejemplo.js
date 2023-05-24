const ProductManager = require('./ProductManager');

const productManager = new ProductManager('productos.json');


// ejemplo

productManager.addProduct({
  title: 'producto de prueba',
  description: 'este es un producto de prueba',
  price: 200,
  thumbnail: 'sin imagen',
  code: 'abc223',
  stock: 25
  
});

console.log(productManager.getProducts());

const productId = // id del producto 
console.log(productManager.getProductById(productId));

const productIdToUpdate = { }// id del producto a actualizar
const updatedFields = { //campo a actualizar

  stock: 30
  
};
productManager.updateProduct(productIdToUpdate, updatedFields);

const productIdToDelete = // id del producto para elminarlo
productManager.deleteProduct(productIdToDelete);
