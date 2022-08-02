const entry = require('../models/entry');

//Get all entries respuesta con los datos del autor y sin ID de la entry:
const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {//Especificando un email
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {//si no especifica email
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

// POST http://localhost:3000/api/entries
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
    if (req.body.title) {
        const response = await entry.updateEntry(req.body)
        res.status(201).json({
            "items_created": response,
            data: newEntry
        });
    }
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