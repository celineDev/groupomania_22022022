const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.CHAR(100),
    allowNull: false
  }
}, {
  lastName: {
    type: DataTypes.CHAR(100),
    allowNull: false
  }
}, {
  email: {
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true
  }
}, {
  password: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  role: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 2
  }
}, {
  avatar: {
    type: DataTypes.CHAR,
    allowNull: true
  }
}, {
  // createdAt: {
  //   allowNull: false,
  //   type: Sequelize.DATE,
  // },
  // updatedAt: {
  //   allowNull: false,
  //   type: Sequelize.DATE,
  // },
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true