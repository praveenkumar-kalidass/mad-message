"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Message", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        read: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        roomId: {
          type: Sequelize.UUID,
          field: "room_id",
          allowNull: false,
          references: {
            model: {
              tableName: "Room"
            }
          }
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
      "Message"
    );
  }
};
