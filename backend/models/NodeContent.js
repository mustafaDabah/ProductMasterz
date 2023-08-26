const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const NodeContentSchema = new mongoose.Schema({
  nodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
    required: true,
  },
  langCode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
});

const NodeContent = mongoose.model("NodeContent", NodeContentSchema);

function validateCreateNodeContent(object) {
  const schema = Joi.object({
    nodeId: Joi.objectId().required(),
    langCode: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    thumbnailUrl: Joi.string(),
  });
  return schema.validate(object);
}

function validateUpdateNodeContent(object) {
  const schema = Joi.object({
    nodeId: Joi.objectId().required(),
    langCode: Joi.objectId().required(),
  });

  return schema.validate(object);
}

module.exports = {
  NodeContent,
  validateUpdateNodeContent,
  validateCreateNodeContent,
};
