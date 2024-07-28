const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likesSchema = new Schema(
  {
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likesSchema);
