const entry = require('../models/entry');

//GET AUTHORS MY EMAIL
const getAuthors = async (req, res) => {
    try {
        let authors;
        if (req.query.email) {
            authors = await entry.getAuthorsByEmail(req.query.email)
        }
        else {
            authors = await entry.getAllAuthors();
        }
        res.status(200).json(authors);
    }
    catch (error) {
        res.status(404).json("not found");
    }
}

//POST
const createAuthor = async (req, res) => {
    try {
        const newAuthor = req.body;
        const response = await entry.createAuthor(newAuthor)
        res.status(200).json({ "usuario creado": req.body.email })
    }
    catch (error) {

    }
}

//PUT
const updateAuthor = async (req, res) => {
    try {
        if (req.body.email) {
            const response = await entry.updateAuthorData(req.body)
            res.status(200).json({ 'message': `Usuario actualizado: ${req.body.email}` })
        }
    }
    catch (error) {
        res.status(400).json({ "fewpofkw": "peowkf" });
    }
}

//DELETE
const deleteAuthor = async (req, res) => {
    try {
        if (req.body.email) {
            const response = await entry.deleteAuthorData(req.body)
            res.status(200).json({ 'message': `Se ha borrado: ${req.body.email}` })
        }
    }
    catch (error) {
        res.status(400).json({ "fewpofkw": "peowkf" });
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}