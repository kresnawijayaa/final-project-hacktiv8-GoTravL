"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name cannot empty",
          },
          notNull: {
            msg: "name cannot null",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "date cannot null",
          },
          isDate: {
            args: true,
            msg: "please input valid date",
          },
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "location Id cannot null",
          },
          isInt: {
            msg: "location Id must be integer",
          },
        },
      },
      tripId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "trip id cannot null",
          },
          isInt: {
            msg: "trip id must be integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
