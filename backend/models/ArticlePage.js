const mongoose = require("mongoose");
const Joi = require("joi");

const ArticlePageSchema = new mongoose.Schema({
  pageUrlName: {
    type: String,
    required: true,
    trim: true,
  },
  tabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tab",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lang: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
  },
  navbar: [
    {
      text: String,
      link: String,
    },
  ],
  header: {
    title: String,
    description: String,
    imageUrl: String,
  },
  content: {
    type: String,
    required: true,
  },
});

ArticlePageSchema.index({ pageUrlName: 1, lang: 1 }, { unique: true });

function validateCreatePage(object) {
  const schema = Joi.object({
    pageUrlName: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    tabId: Joi.string().id().required(),
    lang: Joi.string().trim().required(),
    navbar: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        link: Joi.string().required(),
      })
    ),
    header: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string(),
    }).required(),
    content: Joi.string().required(),
  });
  return schema.validate(object);
}

function validateUpdatePage(object) {
  const schema = Joi.object({
    pageUrlName: Joi.string().trim(),
    name: Joi.string().trim(),
    lang: Joi.string().trim(),
    navbar: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        link: Joi.string().required(),
      })
    ),
    header: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string(),
    }),
    content: Joi.string(),
  });
  return schema.validate(object);
}

const ArticlePage = mongoose.model("ArticlePage", ArticlePageSchema);

module.exports = {
  ArticlePage,
  validateCreatePage,
  validateUpdatePage,
};
