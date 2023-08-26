const asyncHandler = require("express-async-handler");
const { AdminMail, validateCreateAdminMail } = require("../models/AdminMail");

/**
 * @desc
 * @route /api/v0/admin-mails/
 * @method
 * @access
 */
module.exports.Ctrl = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc create admin mail
 * @route /api/v0/admin-mails/
 * @method POST
 * @access
 */
module.exports.createAdminMailCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateAdminMail(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { email } = req.body;
    const emailExists = await AdminMail.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "this email already exists" });
    const newAdminMail = await AdminMail.create({ email });
    res
      .status(201)
      .json({ data: newAdminMail, message: "email is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get admin emails
 * @route /api/v0/admin-mails/
 * @method GET
 * @access private
 */
module.exports.getAdminMailsCtrl = asyncHandler(async (req, res) => {
  try {
    const adminMails = await AdminMail.find();
    res.status(200).json(adminMails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
