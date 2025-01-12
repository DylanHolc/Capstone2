const sequelize = require('../sequelize');
const User = require('./user');
const PokemonCard = require('./pokemonCard');
const YugiohCard = require('./yugiohCard');
const MTGCard = require('./mtgCard');
const Order = require('./order');
const OrderedPokemonCard = require('./orderedPokemonCard');
const OrderedYugiohCard = require('./orderedYugiohCard');
const OrderedMTGCard = require('./orderedMTGCard');

User.hasMany(Order, { onDelete: 'CASCADE', foreignKey: 'user_username' });
Order.belongsTo(User, { onDelete: 'CASCADE', foreignKey: 'user_username' });
Order.belongsToMany(PokemonCard, { through: OrderedPokemonCard, foreignKey: 'order_id' });
Order.belongsToMany(YugiohCard, { through: OrderedYugiohCard, foreignKey: 'order_id' });
Order.belongsToMany(MTGCard, { through: OrderedMTGCard, foreignKey: 'order_id' });
PokemonCard.belongsToMany(Order, { through: OrderedPokemonCard, foreignKey: 'card_id' });
YugiohCard.belongsToMany(Order, { through: OrderedYugiohCard, foreignKey: 'card_id' });
MTGCard.belongsToMany(Order, { through: OrderedMTGCard, foreignKey: 'card_id' });

// const sync = async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Table Synced');
//     } catch (error) {
//         console.log(error);
//     }
// }

// sync();
