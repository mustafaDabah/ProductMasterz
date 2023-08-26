const asyncHandler = require("express-async-handler");
const {
  validateCreateRegisteredLead,
  RegisteredLead,
} = require("../models/RegisteredLead");

/**
 * @desc
 * @route /api/v0/registered-lead/
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
 * @desc create registered lead
 * @route /api/v0/registered-lead/
 * @method POST
 * @access public
 */
module.exports.createRegisteredLeadCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateRegisteredLead(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { name, mobile, email } = req.body;
    const emailExist = await RegisteredLead.findOne({ email });
    if (emailExist)
      return res
        .status(400)
        .json({ message: "email already exists, try to enter aniother one" });
    const mobileExists = await RegisteredLead.findOne({ mobile });
    if (mobileExists)
      return res.status(400).json({
        message: "mobile number already exists, try to enter another one",
      });
    const newRegisteredLead = await RegisteredLead.create(req.body);
    res
      .status(201)
      .json({ data: newRegisteredLead, message: "successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get registered leads
 * @route /api/v0/registered-lead/
 * @method GET
 * @access private
 */
module.exports.getRegisteredLeadsCtrl = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobile } = req.query;

    let query = {};

    if (Object.keys(req.query).length === 0) {
      query = {};
    } else {
      query = {
        name: name || null,
        email: email || null,
        mobile: mobile || null,
      };
    }

    const registeredLeads = await RegisteredLead.find(query);

    res.status(200).json(registeredLeads);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
