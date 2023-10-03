const { signToken, comparePassword } = require("../helpers");
const { chatBot, searchDestination } = require("../helpers/openai");
class userController {
  static async searchBot(req, res, next) {
    try {
      const { body } = req;
      const { chat } = body;
      const result = await chatBot(chat);
      res.status(200).json({message: result});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async destinationAi(req, res, next) {
    try {
      const { body } = req;
      const { destination, duration } = body;
      const result = await searchDestination(destination, duration);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = userController;
