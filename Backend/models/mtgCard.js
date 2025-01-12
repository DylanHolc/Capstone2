const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const MTGCard = sequelize.define('MTGCard',
    {

        id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        artist: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        card_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rarity: {
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
        tableName: 'mtg_cards'
    }
);

MTGCard.getRandom = async () => {
    const randomCards = await MTGCard.findAll({
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

module.exports = MTGCard;