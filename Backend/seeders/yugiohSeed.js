const axios = require('axios');
const { faker } = require('@faker-js/faker');
const YugiohCard = require('../models/yugiohCard');
const yugiohApiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
// const yugiohApiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes";

const seedYugiohCards = async () => {
    const res = await axios.get(yugiohApiUrl);
    let count = 0;
    const numOfCards = 500;
    res.data.data.forEach((card) => {
        const generateCard = async () => {
            await YugiohCard.create({
                id: card.id,
                name: card.name,
                type: card.type,
                race: card.race,
                description: card.desc,
                attack: card.atk,
                defense: card.def,
                image_url: card.card_images[0].image_url_small,
                price: faker.commerce.price({ min: 0.1, max: 100, dec: 2 }),
                stock: faker.number.int({ min: 1, max: 100 })
            });
        }
        if (count < numOfCards) {
            generateCard();
            count++;
        }
    });
}

seedYugiohCards();