'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {
        targetKey: 'postId',
        foreignKey: 'PostId',
      });
      this.belongsTo(models.Member, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  Like.init(
    {
      likesId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      postId: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
