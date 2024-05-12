const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");

class Type extends Model { }

Type.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        gender: {
            type: DataTypes.TINYINT,
            allowNull: true,
            comment: "0: nữ - 1: nam",
        },
    },
    {
        sequelize,
        modelName: "type",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Type;