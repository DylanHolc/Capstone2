const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const session = require('express-session');
const ExpressError = require('./expressError');
const userRoutes = require('./routes/users');
const pokemonRoutes = require('./routes/pokemonCards');
const yugiohRoutes = require('./routes/yugiohCards');
const mtgRoutes = require('./routes/mtgCards');
const cartRoutes = require('./routes/cart');
const { authenticateJWT } = require('./middleware/auth');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MemoryStore = require('memorystore')(session);
require('./models/associations');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));
app.use(authenticateJWT);
app.use(morgan('dev'));
app.use('/users', userRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/yugioh', yugiohRoutes);
app.use('/mtg', mtgRoutes);
app.use('/cart', cartRoutes);

app.get('/', function (req, res) {
    return res.send('Homepage');
});

app.use((req, res, next) => {
    const error = new ExpressError('Not Found', 404);
    return next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error.stack);
    return res.json({
        error: error,
        message: error.message
    });
});

module.exports = app;