'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Member, {
        targetKey: 'id',
        foreignKey: 'user_id',
      });
      this.hasMany(models.Comment, {
        targetKey: 'post_id',
        foreignKey: 'post_id',
      });
      this.hasMany(models.Like, {
        targetKey: 'post_id',
        foreignKey: 'post_id',
      });
    }
  }
  Post.init(
    {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      like: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
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
      modelName: 'Post',
    }
  );
  return Post;
};
