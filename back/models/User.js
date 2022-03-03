const { Sequelize, DataTypes } = require('sequelize');
// const database = require('./config/db_connection');
// const sequelize = require('../config/db_connection');

// database connection
const sequelize = new Sequelize('groupomania', 'root', 'secret', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  _id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  profile: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  // Other model options go here
},
{
  freezeTableName: true
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

// User.sync({ force: true })
// User.sync().then((data) => {
//   console.log('Table and model synced successfully!');
// }).catch((err) => {
//   console.log('Error syncing the table and model!');
// })