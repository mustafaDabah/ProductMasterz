const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const User = mongoose.model("User", UserSchema);

// validate register user
function validateRegisterUser(object) {
  const schema = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(object);
}

// validate login user
function validateLoginUser(object) {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(object);
}

// validate update user
function validateUpdateUser(object) {
  const schema = Joi.object({
    username: Joi.string().trim(),
    password: passwordComplexity(),
    bio: Joi.string(),
  });
  return schema.validate(object);
}

// validate email
function validateEmail(object) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email().required(),
  });
  return schema.validate(object);
}

// validate new password
function validateNewPassword(object) {
  const schema = Joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(object);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateEmail,
  validateNewPassword,
};
