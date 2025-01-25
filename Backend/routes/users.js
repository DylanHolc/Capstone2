const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const salt = Number(process.env.BCRYPT_WORK_FACTOR);
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { ensureLoggedIn } = require('../middleware/auth');
const Order = require('../models/order');
const OrderedPokemonCard = require('../models/orderedPokemonCard');
const OrderedMTGCard = require('../models/orderedMTGCard');
const OrderedYugiohCard = require('../models/orderedYugiohCard');
const PokemonCard = require('../models/pokemonCard');
const MTGCard = require('../models/mtgCard');
const YugiohCard = require('../models/yugiohCard');

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, first_name, last_name, email } = req.body;
        if (!username || !password) {
            throw new ExpressError("Username and password required", 400);
        }
        if (!email) {
            throw new ExpressError("Email address required", 400);
        }
        const hashedPassword = await bcrypt.hash(password, salt);
        const results = await User.create({ username, password: hashedPassword, first_name, last_name, email })
        const token = jwt.sign({ username }, secret);
        return res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7200000
        }).status(201).json({ message: "User Created!" });
    } catch (error) {
        if (error.code === '23505') {
            return next(new ExpressError("Username already taken. Try Again!", 400));
        }
        return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError("Username and password required", 400);
        }
        const user = await User.findByPk(username);
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ username }, secret);
                return res.cookie('auth_token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7200000
                }).status(200).json({ message: "Logged In!" });
            }
        }
        throw new ExpressError("Invalid username/password", 400);
    } catch (error) {
        return next(error);
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        console.log("Logged Out!");
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
        });
        return res.clearCookie('auth_token').status(200).json({ message: "Logged Out!" });
    } catch (error) {
        return next(error);
    }
});

router.get('/:username', ensureLoggedIn, async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findByPk(username);
        return res.json({ username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email, balance: user.balance });
    } catch (error) {
        return next(new ExpressError("You must be logged in to access!", 401));
    }
});

router.get('/:username/orders', ensureLoggedIn, async (req, res, next) => {
    try {
        const { username } = req.params;
        const orders = await Order.findAll({ where: { user_username: username } })
        const orderIds = [];
        for (let order of orders) {
            orderIds.unshift(order.id);
        };
        const combinedOrders = [];
        for (let id of orderIds) {
            const pokemon = await OrderedPokemonCard.findAll({ where: { order_id: id } });
            const mtg = await OrderedMTGCard.findAll({ where: { order_id: id } });
            const yugioh = await OrderedYugiohCard.findAll({ where: { order_id: id } });
            const order = await Order.findByPk(id);
            let orderDate = String(order.createdAt);
            let timestamp = orderDate.slice(0, 15);
            const orderObj = {};
            orderObj.date = timestamp;
            if (pokemon.length) {
                for (let order of pokemon) {
                    const card = await PokemonCard.findByPk(order.card_id);
                    order.dataValues.name = card.name;
                    order.dataValues.image = card.image;
                }
                orderObj.pokemon = pokemon;
            }
            if (mtg.length) {
                for (let order of mtg) {
                    const card = await MTGCard.findByPk(order.card_id);
                    order.dataValues.name = card.name;
                    order.dataValues.image = card.image;
                }
                orderObj.mtg = mtg;
            }
            if (yugioh.length) {
                for (let order of yugioh) {
                    const card = await YugiohCard.findByPk(order.card_id);
                    order.dataValues.name = card.name;
                }
                orderObj.yugioh = yugioh;
            }
            combinedOrders.push(orderObj);
        }
        return res.json(combinedOrders);
    } catch (error) {
        return next(error);
    }
});

router.patch('/:username', ensureLoggedIn, async (req, res, next) => {
    try {
        const { username, first_name, last_name, email } = req.body;
        const results = await User.update({ username, first_name, last_name, email }, {
            where: {
                username: username
            }
        });
        return res.json({ message: "Profile Updated!" });
    } catch (error) {
        return next(new ExpressError(`You must be logged in to access!`, 401));
    }
});

router.patch('/:username/password', ensureLoggedIn, async (req, res, next) => {
    try {
        const { username } = req.params;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw new ExpressError("Old and New password required", 400);
        }
        const user = await User.findByPk(username);
        if (!await bcrypt.compare(oldPassword, user.password)) {
            throw new ExpressError("The old password entered was invalid", 400);
        }
        if (await bcrypt.compare(oldPassword, user.password)) {
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const results = await User.update({ password: hashedPassword }, {
                where: {
                    username: username
                }
            });
            return res.json({ message: "Password Updated!" });
        }
    } catch (error) {
        return next(new ExpressError(`You must be logged in to access!`, 401));
    }
});

router.delete('/:username', ensureLoggedIn, async (req, res, next) => {
    try {
        const { username } = req.params;
        const results = await User.destroy({ where: { username: username } })
        return res.status(204).json({ "msg": "User has been deleted" });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;