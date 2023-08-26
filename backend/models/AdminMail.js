const mongoose = require("mongoose");
const Joi = require("joi");

const AdminMailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const AdminMail = mongoose.model("AdminMail", AdminMailSchema);

function validateCreateAdminMail(object) {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
  });
  return schema.validate(object);
}

module.exports = {
  AdminMail,
  validateCreateAdminMail,
};
