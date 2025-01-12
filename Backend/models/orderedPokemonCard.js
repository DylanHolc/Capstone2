const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const OrderedPokemonCard = sequelize.define('OrderedPokemonCard',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'ordered_pokemon_cards'
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

module.exports = OrderedPokemonCard;
