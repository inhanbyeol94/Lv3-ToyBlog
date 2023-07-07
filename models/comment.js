'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {
        targetKey: 'post_id',
        foreignKey: 'post_id',
      });
      this.belongsTo(models.Member, {
        targetKey: 'id',
        foreignKey: 'user_id',
      });
    }
  }
  Comment.init(
    {
      comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      post_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
