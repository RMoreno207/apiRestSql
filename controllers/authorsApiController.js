const entry = require('../models/entry');

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo




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




// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email

//Query requerido
// SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
// FROM entries AS e
// INNER JOIN authors AS a ON e.id_author=a.id_author;

const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

// [PUT] http://localhost:3000/api/entries/ (parecido a POST) 
// modifica una entry por completo con nuevos datos y retorna 
// un status 200. Buscar por título para editar entry.
const updateEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(200).json({
        "items_modificated": response,
        data: newEntry
    });
}


// [DELETE] http://localhost:3000/api/entries/ Borra una entry y
//  retorna un status 200. Búsqueda por título de entry para borrar.
//   Payload {message: "Se ha borrado la entry 'Título de noticia' "}
const deleteEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(200).json({
        "items_deleted": response,
        data: newEntry
    });
}


module.exports = {
    getEntries,
    createEntry,
    deleteEntry,
    updateEntry
}