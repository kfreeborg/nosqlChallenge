const { Schema, model } = require("mongoose");
const moment = require("moment");
const ReactionSchema = require("/Reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      Type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      Type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      Type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", ThoughtSchema);

module.exports = Thought;