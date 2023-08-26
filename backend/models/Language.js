const Joi = require("joi");
const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  code: {
    type: String,
    maxLength: 10,
    unique: true,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model("Language", LanguageSchema);

function validateCreateLanguage(object) {
  const schema = Joi.object({
    code: Joi.string().lowercase().max(10).required(),
    name: Joi.string().required(),
  });

  return schema.validate(object);
}

function validateUpdateLanguage(object) {
  const schema = Joi.object({
    code: Joi.string().lowercase().max(10),
    name: Joi.string(),
  });

  return schema.validate(object);
}

module.exports = {
  Language,
  validateCreateLanguage,
  validateUpdateLanguage,
};
