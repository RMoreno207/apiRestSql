const express = require('express');
const checkApiKey = require("../middlewares/auth_API_KEY");

// Rutas de productos
const entriesApiController = require("../controllers/entriesApiController");
const entriesApiRouter = express.Router();

entriesApiRouter.get('/', entriesApiController.getEntries);
entriesApiRouter.post('/', entriesApiController.createEntry);
// entriesApiRoutes.put("/", entriesApiController.updateEntry);
//entriesApiRoutes.delete("/", entriesApiController.deleteEntry);

module.exports = entriesApiRouter;