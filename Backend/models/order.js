const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./user');
const Order = sequelize.define('Order',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: 'orders'
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

module.exports = Order; 