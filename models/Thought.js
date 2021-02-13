const { Schema, model, Types } = require("mongoose");
const User = require("./User");
const moment = require("moment");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      Type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      Type: String,
      required: true,
    },
    createdAt: {
      Type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

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
    userId: {
      type: String,
      required: [true, "userId is required for this thought creation"],
    },
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
