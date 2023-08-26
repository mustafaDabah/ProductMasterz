const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const NodeSchema = new mongoose.Schema(
  {
    tagIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    keywords: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// populate nodeContent that belongs to this Node
NodeSchema.virtual("nodeContents", {
  ref: "NodeContent",
  foreignField: "nodeId",
  localField: "_id",
});

const Node = mongoose.model("Node", NodeSchema);

function validateCreateNode(object) {
  const schema = Joi.object({
    tagIds: Joi.array().items(Joi.objectId()),
    slug: Joi.string().required(),
    keywords: Joi.string(),
  });
  return schema.validate(object);
}

function validateUpdateNode(object) {
  const schema = Joi.object({
    tagIds: Joi.array().items(Joi.objectId()),
    slug: Joi.string(),
    keywords: Joi.string(),
  });
  return schema.validate(object);
}

module.exports = {
  Node,
  validateCreateNode,
  validateUpdateNode,
};
