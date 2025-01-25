const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const ExpressError = require('../expressError');


// Middleware is the second argument of a route function between the path and callback
async function authenticateJWT(req, res, next) {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            console.log("No Token Found");
            return next();
        }
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                console.log("Invalid Token");
                return next();
            }
            req.username = payload.username;
            console.log("Valid Token");
            return next();
        });
    } catch (error) {
        return next();
    }
}

async function ensureLoggedIn(req, res, next) {
    if (!req.username) {
        const error = new ExpressError("You are unauthorized to access this page!", 401);
        return next(error);
    } else {
        console.log("You are logged in!")
        return next();
    }
}
module.exports = { authenticateJWT, ensureLoggedIn }; 