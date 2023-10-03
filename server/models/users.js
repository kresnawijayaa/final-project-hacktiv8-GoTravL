"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "email cannot empty",
          },
          notNull: {
            msg: "email cannot empty",
          },
          isEmail: {
            msg: "Please input valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            msg: "password cannot empty",
          },
          notNull: {
            msg: "password cannot empty",
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "fullname cannot empty",
          },
          notNull: {
            msg: "fullname cannot null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(arg) {
          arg.email = arg.email.toLowerCase();
          arg.password = hashPassword(arg.password);
        },
        beforeUpdate(arg) {
          arg.email = arg.email.toLowerCase();
          arg.password = hashPassword(arg.password);
        },
      },
    }
  );
  return User;
};
