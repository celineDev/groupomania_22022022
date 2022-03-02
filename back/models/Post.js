const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  imageUrl: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  date_start: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  date_end: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  author: {
    type: DataTypes.CHAR(100),
    allowNull: false
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
console.log(Post === sequelize.models.Post); // true