const dotenv = require('dotenv');
dotenv.config();
const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
//     dialect: 'postgres'
// });

const sequelize = new Sequelize('postgresql://postgres.gtfmmoajpvspgwvgudsv:XJ0GCxmJcbvl7xos@aws-0-us-west-1.pooler.supabase.com:5432/postgres')
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

module.exports = sequelize;