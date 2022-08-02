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

// Router de productos
// Middleware de acceso para las rutas de products
//app.use("/products",checkApiKey,productsRoutes);
//app.use(checkApiKey); 

// WEB
app.use("/products", productsRoutes);
// API
app.use("/api/products", productsApiRoutes);
app.use("/api/entries", entriesApiRoutes);
app.use("/api/authors", authorsApiRoutes);

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

// Middleware error
// Respuesta por defecto para rutas no existentes
app.use(manage404);

app.listen(port, () => {
    console.log(cowsay.say(`Mi servidor funciona en http://localhost:${port}`, { cow: whale }));
})