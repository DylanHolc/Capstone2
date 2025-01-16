const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const MTGCard = require('../models/mtgCard');
const sequelize = require('sequelize')
const Op = sequelize.Op;

router.get('/cards', async (req, res, next) => {
    try {
        const cards = await MTGCard.findAll();
        return res.json({ cards });
    } catch (error) {
        return next(error);
    }
});

router.get('/cards/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await MTGCard.findOne({ where: { id: id } });
        if (card === null) {
            throw new ExpressError("Card not found!", 404);
        }
        return res.json(card);
    } catch (error) {
        return next(error);
    }
});

router.get('/random', async (req, res, next) => {
    try {
        const randomCards = await MTGCard.getRandom();
        return res.json(randomCards);
    } catch (error) {
        return next(error);
    }
});

router.get('/search/:term', async (req, res, next) => {
    try {
        const { term } = req.params
        const cards = await MTGCard.findAll({
            where: {
                name: { [Op.like]: '%' + term + '%' }
            }
        });
        return res.json(cards);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;