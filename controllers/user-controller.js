const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
