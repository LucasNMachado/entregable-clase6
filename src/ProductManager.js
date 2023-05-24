const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const jsonData = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, jsonData);
  }

  addProduct(product) {
    const newProduct = { ...product, id: this.generateId() };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(productId, updatedFields) {
    const product = this.getProductById(productId);
    const updatedProduct = { ...product, ...updatedFields };
    const index = this.products.findIndex((product) => product.id === productId);
    this.products[index] = updatedProduct;
    this.saveProducts();
  }

  deleteProduct(productId) {
    const index = this.products.findIndex((product) => product.id === productId);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products.splice(index, 1);
    this.saveProducts();
  }

  generateId() {
    let id;
    do {
      id = Math.random().toString(36).substr(2, 9);
    } while (this.products.some((product) => product.id === id));
    return id;
  }
}

module.exports = ProductManager;
