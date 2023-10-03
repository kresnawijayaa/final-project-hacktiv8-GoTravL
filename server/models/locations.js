"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name cannot empty",
          },
          notNull: {
            msg: "name cannot empty",
          },
        },
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "latitude cannot empty",
          },
          notNull: {
            msg: "latitude cannot empty",
          },
        },
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "longitude cannot empty",
          },
          notNull: {
            msg: "longitude cannot empty",
          },
        },
      },
      openingHours: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "address cannot empty",
          },
          notNull: {
            msg: "address cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
