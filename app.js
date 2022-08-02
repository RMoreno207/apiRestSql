//SQL Query para hacer title unico
// ALTER TABLE entries
// ADD CONSTRAINT titleId UNIQUE (title); 


// Módulos externos
const express = require('express')
const emoji = require('emoji-whale');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const whale = require('cowsay2/cows/whale');

// Rutas
const productsRoutes = require('./routes/productsRoutes');
const productsApiRoutes = require('./routes/productsApiRoutes');
const entriesApiRoutes = require('./routes/entriesApiRoutes');
const authorsApiRoutes = require('./routes/authorsApiRoutes');

// Tu propio módulo
//const calc = require('./utils/calculator.js');
const calc = require('./utils/calculator');

// Middlewares
const manage404 = require('./middlewares/error404');
const checkApiKey = require('./middlewares/auth_API_KEY');

const app = express()
const port = 3000

// View engine
app.set('view engine', 'pug');
app.set('views', './views');

//Permite leer el body recibido en una petición
app.use(express.json());

//Middleware de acceso para TODAS las rutas
//app.use(checkApiKey); 

// Router de productos
// Middleware de acceso para las rutas de products
//app.use("/products",checkApiKey,productsRoutes);

// WEB
app.use("/products", productsRoutes);
// API
app.use("/api/products", productsApiRoutes);
app.use("/api/entries", entriesApiRoutes);
app.use("/api/authors", authorsApiRoutes);
/*
WEB
http://localhost:3000/products GET
http://localhost:3000/products/4 GET

API
http://localhost:3000/api/products GET
http://localhost:3000/api/products/3 GET
http://localhost:3000/api/products POST
http://localhost:3000/api/products DELETE
*/


// HOME
// http://127.0.0.1:3000
// http://localhost:3000
app.get('/', (req, res) => {
    console.log(emoji);
    console.log(cowsay.say('Hola que tal?', { cow: owl }));
    //res.send('Hola desde mi primer servidor :) !!!!'+emoji)
    let msj = 'Hola desde mi primer servidor :) !!!!' + emoji;
    // res.render("my_view.pug",{section:"Home",msj});
    res.render("my_view", { section: "Home", msj });
})

// http://localhost:3000/pokemon/charmander
// http://localhost:3000/pokemon/mew
// http://localhost:3000/pokemon/pikachu
// http://localhost:3000/pokemon/snorlax

// http://localhost:3000/pokemon
app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    let msj = "";
    if (req.params.name) { // si hay parámetro name
        msj = 'Aquí te envío a:' + req.params.name;
    } else {
        msj = 'Aquí te envío a todos los pokemon del planeta';
    }
    console.log(cowsay.say(msj, { cow: owl })); // Imprime el buho con msj
    //res.send(msj+" "+emoji);
    res.render("my_view", { section: "Pokemon", msj });
})

app.get('/perritos', (req, res) => {
    let msj = "¿cuánto son 2+2?: " + calc.add(2, 2);
    console.log(cowsay.say(msj, { cow: owl }));
    let msj2 = 'Aquí te enviaría mis perritos y...' + msj + " " + emoji;
    // res.send('Aquí te enviaría mis perritos y...'+msj+" "+emoji)
    res.render("my_view", { section: "Perritos", msj: msj2 });
})

// Middleware error
// Respuesta por defecto para rutas no existentes
app.use(manage404);


app.listen(port, () => {
    console.log(cowsay.say(`Mi servidor funciona en http://localhost:${port}`, { cow: whale }));
})