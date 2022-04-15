'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });

  Like.associate = function (models) {
    Like.belongsTo(models.User), {
      foreignKey: 'userId',
      as: 'user',
    }
    Like.belongsTo(models.Post), {
      foreignKey: 'postId',
      as: 'post',
    }
  };

  return Like;
};