const mongoose = require("mongoose");
const Joi = require("joi");

const RegisteredLeadSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const RegisteredLead = mongoose.model("RegisteredLead", RegisteredLeadSchema);

function validateCreateRegisteredLead(object) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    mobile: Joi.string().trim().required(),
    email: Joi.string().trim().lowercase().required().email(),
  });
  return schema.validate(object);
}
module.exports = {
  RegisteredLead,
  validateCreateRegisteredLead,
};
