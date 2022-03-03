const { Sequelize, DataTypes } = require('sequelize');

// database connection
const sequelize = new Sequelize('groupomania', 'root', 'secret', {
  host: 'localhost',
  dialect: 'mysql'
});

const Comment = sequelize.define('Comment', {
  // Model attributes are defined here
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // Other model options go here
},
{
  freezeTableName: true
});

// `sequelize.define` also returns the model
console.log(Comment === sequelize.models.Comment); // true

// Comment.sync({ force: true })
// Comment.sync().then((data) => {
//   console.log('Table and model synced successfully!');
// }).catch((err) => {
//   console.log('Error syncing the table and model!');
// })