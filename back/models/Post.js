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
      // define association here
    }
  }
  Post.init({
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    video: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Post',
  });

  Post.associate = function (models) {
    Post.hasMany(models.Comment),
    Post.belongsTo(models.User), {
      foreignKey: {
        allowNull: false
      }
    }
  };

  return Post;
};