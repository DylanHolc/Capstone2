const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const YugiohCard = require('../models/yugiohCard');
const sequelize = require('sequelize')
const Op = sequelize.Op;

router.get('/cards', async (req, res, next) => {
    try {
        const cards = await YugiohCard.findAll();
        return res.json({ cards });
    } catch (error) {
        return next(error);
    }
});

router.get('/cards/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await YugiohCard.findOne({ where: { id: id } })
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
        const randomCards = await YugiohCard.getRandom();
        return res.json(randomCards);
    } catch (error) {
        return next(error);
    }
});

router.get('/search/:term', async (req, res, next) => {
    try {
        const { term } = req.params
        const cards = await YugiohCard.findAll({
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