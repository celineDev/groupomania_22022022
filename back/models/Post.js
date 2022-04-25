'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Comment, { onDelete: 'cascade', hooks: true }),
      Post.hasMany(models.Like, { onDelete: 'cascade', hooks: true }),
      Post.belongsTo(models.User, { onDelete: 'cascade', foreignKey: 'userId', as: 'user' })
    }
  }

  Post.init({
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Post',
  });

  return Post;
};