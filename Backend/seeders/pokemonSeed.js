const axios = require('axios');
const { faker } = require('@faker-js/faker');
const pokemonCard = require('../models/pokemonCard');
const pokemonApiUrl = "https://api.pokemontcg.io/v2/cards?page=1&pageSize=100";
const pokemonApiUrl2 = "https://api.pokemontcg.io/v2/cards?page=2&pageSize=100";
const pokemonApiUrl3 = "https://api.pokemontcg.io/v2/cards?page=3&pageSize=100";
const pokemonApiUrl4 = "https://api.pokemontcg.io/v2/cards?page=4&pageSize=100";
const urls = [pokemonApiUrl, pokemonApiUrl2, pokemonApiUrl3, pokemonApiUrl4];

const seedPokemonCards = async (url) => {
    const res = await axios.get(url);
    res.data.data.map((card) => {
        const generateCard = async () => {
            await pokemonCard.create({
                id: card.id,
                name: card.name,
                flavor_text: card.flavorText,
                rarity: card.rarity,
                hp: card.hp,
                evolves_from: card.evolvesFrom,
                image: card.images.small,
                artist: card.artist,
                price: faker.commerce.price({ min: 0.1, max: 100, dec: 2 }),
                stock: faker.number.int({ min: 1, max: 100 })
            });
        }
        generateCard();
    });
}

const seed = async () => {
    for (let url of urls) {
        seedPokemonCards(url);
    }
};

seed();