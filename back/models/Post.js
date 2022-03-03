const { Sequelize, DataTypes } = require('sequelize');

// database connection
const sequelize = new Sequelize('groupomania', 'root', 'secret', {
  host: 'localhost',
  dialect: 'mysql'
});

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
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
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Other model options go here
},
{
  freezeTableName: true
});

// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true

// User.sync({ force: true })
// Post.sync().then((data) => {
//   console.log('Table and model synced successfully!');
// }).catch((err) => {
//   console.log('Error syncing the table and model!');
// })