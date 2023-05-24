const express = require('express');
const ProductManager = require('./src/ProductManager');

const app = express();
const port = 8080;


app.get('/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const productManager = new ProductManager('./productos.json');
  const products = productManager.getProducts(limit);
  res.json(products);
});


app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const productManager = new ProductManager('./productos.json');
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
