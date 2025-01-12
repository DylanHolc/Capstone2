const axios = require('axios');
const { faker } = require('@faker-js/faker');
const mtgCard = require('../models/mtgCard');
const mtgApiUrl = "https://api.magicthegathering.io/v1/cards?page=1";
const mtgApiUrl2 = "https://api.magicthegathering.io/v1/cards?page=2";
const mtgApiUrl3 = "https://api.magicthegathering.io/v1/cards?page=3";
const mtgApiUrl4 = "https://api.magicthegathering.io/v1/cards?page=4";
const urls = [mtgApiUrl, mtgApiUrl2, mtgApiUrl3, mtgApiUrl4]
const seedMagicCards = async (url) => {
    const res = await axios.get(url);
    res.data.cards.map((card) => {
        if (card.imageUrl) {
            const generateCard = async () => {
                await mtgCard.create({
                    id: card.number,
                    artist: card.artist,
                    image: card.imageUrl,
                    name: card.name,
                    card_text: card.text,
                    type: card.type,
                    rarity: card.rarity,
                    price: faker.commerce.price({ min: 0.1, max: 100, dec: 2 }),
                    stock: faker.number.int({ min: 1, max: 100 })
                });
            }
            generateCard();
        }
    });
}
const seed = async => {
    for (let url of urls) {
        seedMagicCards(url);
    }
};

seed();