const mongoose = require("mongoose");
const aggregate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

commentsSchema.plugin(require("aggregate"));

module.exports = mongoose.model("Comment", commentsSchema);
