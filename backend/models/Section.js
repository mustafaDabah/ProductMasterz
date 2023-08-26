const Joi = require("joi");
const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
    required: true,
  },
});
SectionSchema.index({ name: 1, lang: 1 }, { unique: true });

const Section = mongoose.model("Section", SectionSchema);

function validateCreateSection(object) {
  const schema = Joi.object({
    name: Joi.string().required(),
    html: Joi.string().required(),
    lang: Joi.string().required(),
    pageName: Joi.string().required(),
  });
  return schema.validate(object);
}

module.exports = {
  Section,
  validateCreateSection,
};
