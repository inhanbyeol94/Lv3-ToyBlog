'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      post_id: {
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'post_id',
        },
        onDelete: 'CASCADE',
        type: Sequelize.BIGINT,
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'Members',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: Sequelize.BIGINT,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  },
};
