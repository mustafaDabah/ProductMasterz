const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
    },
    route: {
      type: String,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PageSchema.virtual("sections", {
  ref: "Section",
  foreignField: "pageId",
  localField: "_id",
});

const Page = mongoose.model("Page", PageSchema);

module.exports = { Page };
