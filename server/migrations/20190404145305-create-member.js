"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Member", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          field: "user_id",
          allowNull: false,
          references: {
            model: {
              tableName: "User"
            }
          }
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
      "Member"
    );
  }
};
