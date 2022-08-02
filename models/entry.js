require('dotenv').config()
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: 'sqlpami'
})

// const pool = new Pool({
//     host: process.env.dbHost,
//     user: process.env.dbUser,
//     database: process.env.dbDatabase,
//     password: process.env.dbPassword
// })

//SQL Query para hacer title unico
//Ejecutado en pgAdmin
// ALTER TABLE entries
// ADD CONSTRAINT titleId UNIQUE (title); 

// GET por email
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                FROM entries AS e
                INNER JOIN authors AS a
                ON e.id_author=a.id_author
                WHERE a.email=$1
                ORDER BY e.title;`, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//Get all entries respuesta con los datos del autor y sin ID de la entry:
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(
            `SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
        FROM entries AS e
        INNER JOIN authors AS a ON e.id_author=a.id_author;`
        )
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// POST create entry
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,
                                    (SELECT id_author FROM authors WHERE email=$3),$4)`
            , [title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE
const updateEntry = async () => {
    const { title, content, email, category } = entry;
    console.log(title, content, category);
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(
            `UPDATE entries
            SET CONTENT = $2, category=$3
            WHERE title=$1`, [title, content, category])
        result = data.rowCount
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE 
const deleteEntry = async () => {
    const { title, content, email, category } = entry;
    console.log(title, content, category);
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(
            `DELETE FROM entries
            WHERE title=$1`, [title])
        result = data.rowCount
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//AUTHORS
//GET by email
const getAuthorsByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT *
                FROM authors
                WHERE email=$1`, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//GET all
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT *
                FROM authors
                 `)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result

}

//POST
const createAuthor = async (author) => {
    const { id_author, name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO authors(id_author,name,surname,email,image) 
                                    VALUES ($1,$2,$3,$4,$5)`, [id_author, name, surname, email, image])

        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//PUT
const updateAuthor = async (author) => {
    const { id_author, name, surname, email, image } = author;
    console.log("este es el author" + email)
    let client, result;
    client = await pool.connect();
    try {

        const data = await client.query(`
        UPDATE authors
        SET id_author = $1, name = $2, surname = $3, image = $5
        WHERE email = $4`, [id_author, name, surname, email, image])
        result = data.rowCount
        console.log(result)
    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        client.release();
    }
    return result
}

//DELETE
const deleteAuthor = async (author) => {
    const { id_author, name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`
        DELETE FROM authors
        WHERE email = $4`, [id_author, name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        client.release();
    }
    return result
}

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry,
    getAuthorsByEmail,
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = entries;


// Pruebas
/*
    getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))
*/

/*
getAllEntries()
.then(data=>console.log(data))
*/

/*
let newEntry = {
    title:"noticia desde Node",
    content:"va a triunfar esto2",
    email:"alejandru@thebridgeschool.es",
    category:"sucesos"}

createEntry(newEntry)
.then(data=>console.log(data))
*/