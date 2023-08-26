const mongoose = require("mongoose");
const Joi = require("joi");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Tag = mongoose.model("Tag", TagSchema);

function validateCreateTag(object) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(object);
}

function validateUpdateTag(object) {
  const schema = Joi.object({
    name: Joi.string(),
  });
  return schema.validate(object);
}

module.exports = {
  Tag,
  validateCreateTag,
  validateUpdateTag,
};
