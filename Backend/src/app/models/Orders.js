const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db/index");

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_user",
    },
  },
  {
    sequelize,
    modelName: "orders",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Orders;
