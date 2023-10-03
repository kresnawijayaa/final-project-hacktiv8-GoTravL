const { signToken, comparePassword } = require("../helpers");
const { User } = require("../models/");
class userController {
  static async updateAccount(req, res, next) {
    try {
      const { body } = req;
      console.log(body);
      const { email, password, fullName } = body;
      if (!email) {
        throw { name: "BlankForm", message: "Email Cannot Blank" };
      }
      if (!password) {
        throw { name: "BlankForm", message: "Password Cannot Blank" };
      }
      if (!fullName) {
        throw { name: "BlankForm", message: "fullname cannot Blank" };
      }
      const { id } = req.user;
      const find = await User.findByPk(id);
      const update = await find.update(body);
      console.log(update);
      res.status(200).json({
        message: "Success Update User",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getMyAccount(req, res, next) {
    try {
      const { id } = req.user;
      const find = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
      return res.status(200).json(find);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async loginAccount(req, res, next) {
    try {
      const { body } = req;
      const { email, password } = body;
      if (!email) {
        throw { name: "BlankForm", message: "Email Cannot Blank" };
      }
      if (!password) {
        throw { name: "BlankForm", message: "Password Cannot Blank" };
      }
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw { name: "Unauthorized", message: "Wrong email / password" };
      }
      const payload = {
        id: findUser.id,
        email: email,
      };
      const compare = comparePassword(password, findUser.password);
      if (!compare) {
        throw { name: "Unauthorized", message: "Wrong email / password" };
      }
      const token = signToken(payload);
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async registerAccount(req, res, next) {
    try {
      const { body } = req;
      const { email, password, fullName } = body;
      if (!email) {
        throw { name: "BlankForm", message: "Email Cannot Blank" };
      }
      if (!password) {
        throw { name: "BlankForm", message: "Password Cannot Blank" };
      }
      if (!fullName) {
        throw { name: "BlankForm", message: "fullname cannot Blank" };
      }
      const create = await User.create(body);
      const payload = {
        id: create.id,
        email: email,
      };
      const token = signToken(payload);
      res.status(201).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = userController;
