const express = require('express');//package for express
const app = express();//express app
app.use(express.json());//express.json
require('dotenv').config();//package for dotenv
const session = require('express-session')//package for express-session
const {SERVER_PORT, SESSION_SECRET} = process.env;

const CFS = require('./middlewares/checkForSession');
const swagC = require('./controllers/swagController')
const AC = require('./controllers/authController');
const cartC = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

//Middleware
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(CFS);

//endpoints
app.get(`/api/swag`, swagC.read);

//AC
app.post('/api/login', AC.login);
//register
app.post('/api/register', AC.register);
//signout
app.post('/api/signout', AC.signout);
//read
app.get('/api/user', AC.getUser);


//CART
app.post('/api/cart/checkout', cartC.checkout);
app.post('/api/cart/:id', cartC.add);
app.delete('/api/cart/:id', cartC.delete);

//SEARCH
app.get('/api/search/', searchController.search);

app.listen(SERVER_PORT, () => {
    console.log(`Running on server port ${SERVER_PORT}`)
})