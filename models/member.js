'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, {
        targetKey: 'id',
        foreignKey: 'user_id',
      });

      this.hasMany(models.Like, {
        targetKey: 'id',
        foreignKey: 'user_id',
      });

      this.hasMany(models.Comment, {
        targetKey: 'id',
        foreignKey: 'user_id',
      });
    }
  }
  Member.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      user_id: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: 'Member',
    }
  );
  return Member;
};
