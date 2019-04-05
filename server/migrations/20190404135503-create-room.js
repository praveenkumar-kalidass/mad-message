"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Room", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          defaultValue: Sequelize.fn("NOW")
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          defaultValue: Sequelize.fn("NOW")
        }
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(
      "Room"
    );
  }
};
