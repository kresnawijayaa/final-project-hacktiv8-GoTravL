"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "title cannot empty",
          },
          notNull: {
            msg: "title cannot empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description cannot empty",
          },
          notNull: {
            msg: "description cannot empty",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "userId cannot null",
          },
          isInt: {
            msg: "user id must be integer",
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start date cannot empty",
          },
          isDate: {
            msg: "please input valid date",
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "end date cannot empty",
          },
          isDate: {
            msg: "please input valid date",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
