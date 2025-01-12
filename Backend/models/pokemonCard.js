const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PokemonCard = sequelize.define('PokemonCard',

    {
        id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        flavor_text: {
            type: DataTypes.TEXT,
        },
        rarity: {
            type: DataTypes.TEXT,
        },
        hp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        evolves_from: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        artist: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        tableName: 'pokemon_cards',
    },

);

PokemonCard.getRandom = async () => {
    const randomCards = await PokemonCard.findAll({
        order: sequelize.random(),
        limit: 3
    });
    return randomCards;
};


// const sync = async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Table Synced');
//     } catch (error) {
//         console.log(error);
//     }
// }

// sync();

module.exports = PokemonCard;