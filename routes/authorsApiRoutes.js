const express = require('express');
const checkApiKey = require("../middlewares/auth_API_KEY");
// Rutas de productos
const authorsApiController = require("../controllers/authorsApiController");
const authorsApiRouter = express.Router();

authorsApiRouter.get('/:email?', authorsApiController.getAuthors)
authorsApiRouter.post('/', authorsApiController.createAuthor)
authorsApiRouter.put('/', authorsApiController.updateAuthor)
authorsApiRouter.delete('/', authorsApiController.deleteAuthor)

module.exports = authorsApiRouter;