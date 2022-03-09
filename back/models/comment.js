'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Comment',
  });

  // Comment.belongsTo(Model.User)
  // Comment.belongsTo(Model.Post)

  Comment.associate = function (models) {
    Comment.belongsTo(models.User), {
      foreignKey: {
        allowNull: false
      }
    },
    Comment.belongsTo(models.Post), {
      foreignKey: {
        allowNull: false
      }
    }
  };
  return Comment;
};