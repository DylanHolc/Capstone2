const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const PokemonCard = require('../models/pokemonCard');
const YugiohCard = require('../models/yugiohCard');
const MTGCard = require('../models/mtgCard');
const User = require('../models/user')
const Order = require('../models/order');
const OrderedPokemonCard = require('../models/orderedPokemonCard');
const OrderedMTGCard = require('../models/orderedMTGCard');
const OrderedYugiohCard = require('../models/orderedYugiohCard');

router.get('/', async (req, res, next) => {
    try {
        const { cart } = req.session;
        if (!cart) {
            return res.send({ message: "Your cart is empty" })
        }
        else {
            return res.json(cart);
        }
    } catch (error) {
        return next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { type, id, quantity } = req.body;
        if (type === 'pokemon') {
            const card = await PokemonCard.findByPk(id);
            const cartItem = { id, name: card.name, image: card.image, quantity, price: card.price, type };
            if (req.session.cart) {
                if (req.session.cart.items.some((item) => item.id === id)) {
                    req.session.cart.items.map((item) => {
                        if (item.id === id) {
                            item.quantity += quantity;
                        }
                    });
                } else {
                    req.session.cart.items.push(cartItem);
                }
            }
            else {
                req.session.cart = {
                    items: [cartItem]
                };
            }
            return res.status(201).send({ message: "Cart item added successfully!" })
        }
        if (type === 'mtg') {
            const card = await MTGCard.findByPk(id);
            const cartItem = { id, name: card.name, image: card.image, quantity, price: card.price, type };
            if (req.session.cart) {
                if (req.session.cart.items.some((item) => item.id === id)) {
                    req.session.cart.items.map((item) => {
                        if (item.id === id) {
                            item.quantity += quantity;
                        }
                    });
                } else {
                    req.session.cart.items.push(cartItem);
                }
            }
            else {
                req.session.cart = {
                    items: [cartItem]
                };
            }
            return res.status(201).send({ message: "Cart item added successfully!" })
        }
        if (type === 'yugioh') {
            const card = await YugiohCard.findByPk(id);
            const cartItem = { id, name: card.name, image: `https://capstone2-yugioh-images.s3.us-east-1.amazonaws.com/Yugioh_Images/${id}.jpg`, quantity, price: card.price, type };
            if (req.session.cart) {
                if (req.session.cart.items.some((item) => item.id === id)) {
                    req.session.cart.items.map((item) => {
                        if (item.id === id) {
                            item.quantity += quantity;
                        }
                    });
                } else {
                    req.session.cart.items.push(cartItem);
                }
            }
            else {
                req.session.cart = {
                    items: [cartItem]
                };
            }
            return res.status(201).send({ message: "Cart item added successfully!" })
        }
        else {
            throw new ExpressError("Item type not found", 406);
        }
    } catch (error) {
        return next(error);
    }
});

router.patch('/', async (req, res, next) => {
    try {
        const { id, quantity } = req.body;
        const { items } = req.session.cart;
        items.map((item) => {
            if (item.id === id) {
                item.quantity = quantity;
            }
        });
        return res.send({ message: "Cart successfully updated" })

    } catch (error) {
        return next(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { items } = req.session.cart;
        req.session.cart = {
            items: items.filter((item) => item.id !== id)
        }
        return res.json({ message: "Item removed from cart" });
    } catch (error) {
        return next(error);
    }
});

router.post('/purchase', async (req, res, next) => {
    try {
        const { username } = req
        const { items } = req.body;
        const user = await User.findByPk(username);
        if (user) {
            const order = await Order.create({ user_username: user.username })
            for (let item of items) {
                if (item.type === 'pokemon') {
                    const newPokemonOrder = await OrderedPokemonCard.create({ order_id: order.id, card_id: item.id, quantity: item.quantity })
                    const card = await PokemonCard.findByPk(item.id)
                    const results = await PokemonCard.update({ stock: (card.stock - item.quantity) },
                        {
                            where: {
                                id: item.id
                            },
                        })
                }
                if (item.type === 'mtg') {
                    const newOrderItem = await OrderedMTGCard.create({ order_id: order.id, card_id: item.id, quantity: item.quantity })
                    const card = await MTGCard.findByPk(item.id)
                    const results = await MTGCard.update({ stock: (card.stock - item.quantity) },
                        {
                            where: {
                                id: item.id
                            },
                        })
                }
                if (item.type === 'yugioh') {
                    const newOrderItem = await OrderedYugiohCard.create({ order_id: order.id, card_id: item.id, quantity: item.quantity })
                    const card = await YugiohCard.findByPk(item.id)
                    const results = await YugiohCard.update({ stock: (card.stock - item.quantity) },
                        {
                            where: {
                                id: item.id
                            },
                        })
                }
            };
        }
        else {
            for (let item of items) {
                if (item.type === 'pokemon') {
                    const card = await PokemonCard.findByPk(item.id)
                    const results = await PokemonCard.update({ stock: (card.stock - item.quantity) },
                        {
                            where: {
                                id: item.id
                            },
                        })
                }
                if (item.type === 'mtg') {
                    const card = await MTGCard.findByPk(item.id)
                    const results = await MTGCard.update({ stock: (card.stock - item.quantity) },
                        {
                            where: {
                                id: item.id
                            },
                        })
                }
                if (item.type === 'yugioh') {
                    const card = await YugiohCard.findByPk(item.id)
                    const results = await YugiohCard.update({ stock: (card.stock - item.quantity) },
                        {
                            where: {
                                id: item.id
                            },
                        })
                }
            };
        }
        delete req.session.cart;
        console.log(req.session);
        return res.json({ message: "Purchase complete" })
    } catch (error) {
        return next(error);
    }
});

module.exports = router