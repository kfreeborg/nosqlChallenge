const { User, Thought, Reaction } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select("__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "reactions", select: "-__v" },
      ])
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      runValidators: true,
      new: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
  addFriend({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        Thought.findOneAndUpdate(
          { _id: params.reactionId },
          { $addToSet: { reactions: params.thoughtId } },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData2) => {
            if (!dbThoughtData2) {
              res
                .status(404)
                .json({ message: "No reaction found with this id" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },
  deleteFriend({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        Thought.findOneAndUpdate(
          { _id: params.reactionId },
          { $pull: { reactions: params.thoughtId } },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData2) => {
            if (!dbThoughtData2) {
              res
                .status(404)
                .json({ message: "No reaction found with this id" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
