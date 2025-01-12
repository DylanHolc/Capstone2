const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const OrderedMTGCard = sequelize.define('OrderedMTGCard',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'ordered_mtg_cards'
    }
);

// const sync = async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Table Synced');
//     } catch (error) {
//         console.log(error);
//     }
// }

// sync();

module.exports = OrderedMTGCard;
