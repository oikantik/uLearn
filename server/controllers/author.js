const authorServices = require("../services/author");
const userServices = require("../services/user");

module.exports = {
  find: async (req, res) => {
    try {
      const user = await userServices.find({
        email: req.query.email,
      });
      if (!user) {
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });
      }
      console.log(user);
      const author = await authorServices.find({ user_id: user.id });
      return res.status(200).json(author);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  createUpdate: async (req, res) => {
    try {
      const author = await authorServices.find({
        user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
      });
      if (!author) {
        await authorServices.create({
          user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
          ...req.body,
        });
        return res.status(200).json({ message: "author created successfully" });
      }
      await authorServices.update({ author, ...req.body });
      return res.status(200).json({ message: "author updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
};
