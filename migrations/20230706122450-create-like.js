'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      likesId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      PostId: {
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'postId',
        },
        onDelete: 'CASCADE',
        type: Sequelize.BIGINT,
      },
      UserId: {
        allowNull: false,
        references: {
          model: 'Members',
          key: 'userId',
        },
        onDelete: 'CASCADE',
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  },
};
