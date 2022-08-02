const express = require('express');
// Rutas de productos
const productsController = require("../controllers/productsController");
const productsRouter = express.Router();

const checkApiKey = require('../middlewares/auth_API_KEY');

// /products
productsRouter.get('/:id?',productsController.getProducts);

/*
productsRouter.post('/',checkApiKey,productsController.createProduct);
productsRouter.delete('/',checkApiKey, productsController.deleteProduct);
*/

module.exports = productsRouter;
