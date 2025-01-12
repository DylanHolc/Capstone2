const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const YugiohCard = sequelize.define('YugiohCard',
    {
        id: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        race: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        attack: {
            type: DataTypes.INTEGER,
        },
        defense: {
            type: DataTypes.INTEGER,
        },
        image_url: {
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
        tableName: 'yugioh_cards'
    }
);

YugiohCard.getRandom = async () => {
    const randomCards = await YugiohCard.findAll({
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

module.exports = YugiohCard;