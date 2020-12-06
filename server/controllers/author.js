const Author = require("../models/Author");
const User = require("../models/User");

const updateAuthor = async (req, res) => {
  try {
    // const author = new Author({
    //   author_name: req.body.author_name,
    //   author_bio: req.body.author_bio,
    //   user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
    // });

    console.log("i fire 1");
    const author = await Author.where({
      user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
    }).fetch();

    console.log("i fire 2", author);

    if (!author) {
      await new Author({
        author_name: req.body.author_name,
        author_bio: req.body.author_bio,
        user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
      }).save();
      res.status(200).json({ message: "author created successfully" });
    }

    await author.save({
      author_name: req.body.author_name,
      author_bio: req.body.author_bio,
    });
    // const data = await author.save();
    res.status(200).json({ message: "author updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      error: error.message,
      messasge: "operation failed",
    });
  }
};

module.exports = {
  updateAuthor,
};