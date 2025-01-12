const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User',
    {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        first_name: {
            type: DataTypes.TEXT,

        },
        last_name: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        // Other model options
        tableName: 'users'
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

module.exports = User;