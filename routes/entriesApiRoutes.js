const express = require('express');
// Rutas de productos
const entriesApiController = require("../controllers/entriesApiController");
const entriesApiRouter = express.Router();

entriesApiRouter.get('/', entriesApiController.getEntries);
entriesApiRouter.post('/', entriesApiController.createEntry);
// entriesApiRoutes.put("/", entriesApiController.updateEntry);
//entriesApiRoutes.delete("/", entriesApiController.deleteEntry);

module.exports = entriesApiRouter;

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/entries
// [PUT] http://localhost:3000/api/entries/ (parecido a POST) modifica una 
// entry por completo con nuevos datos y retorna un status 200. Buscar por 
// título para editar entry.
// [DELETE] http://localhost:3000/api/entries/ Borra una entry y retorna un
//  status 200. Búsqueda por título de entry para borrar. Payload {message:
//      "Se ha borrado la entry 'Título de noticia' "}