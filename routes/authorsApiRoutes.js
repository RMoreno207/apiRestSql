const express = require('express');
// Rutas de productos
const authorsApiController = require("../controllers/authorsApiController");
const authorsApiRouter = express.Router();

authorsApiRouter.get('/', authorsApiController.getEntries);
authorsApiRouter.post('/', authorsApiController.createEntry);

module.exports = authorsApiRouter;

// [GET] http://localhost:3000/api/authors Retorna un objeto con los datos
//  de todos los autores. Retorna un status 200
// [GET] http://localhost:3000/api/authors?email=alejandru@thebridgeschool
// .es Retorna un objeto con los datos del autor buscado. Retorna un status
//  200
// [POST] http://localhost:3000/api/authors/ Se envía por POST los datos del
//  autor a crear y retorna un status 201. Payload {message: "usuario creado:
//   albertu@thebridgeschool.es"}
// [PUT] http://localhost:3000/api/authors/ Actualiza los datos de un autor
//  y retorna un status 200. Payload {message: "usuario actualizado: 
//  albertu@thebridgeschool.es"}
// [DELETE] http://localhost:3000/api/authors/ Borra un autor y retorna un
//  status 200. Búsqueda por email. Payload {message: "Se ha borrado 
//  albertu@thebridgeschool.es"}