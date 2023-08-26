const asyncHandler = require("express-async-handler");
const { Webinar } = require("../models/Webinar");

/**
 * @desc
 * @route /api/v0/webinar
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
 * @desc get webinar page
 * @route /api/v0/webinar/:lang
 * @method GET
 * @access public
 */
module.exports.getWebinarCtrl = asyncHandler(async (req, res) => {
  try {
    const { lang } = req.params;
    const page = await Webinar.findOne({ lang });
    if (!page) return res.status(404).json({ message: "not found" });
    return res.status(200).json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update webinar page
 * @route /api/v0/webinar/:lang
 * @method PUT
 * @access private( only admins)
 */
module.exports.updateWebinarCtrl = asyncHandler(async (req, res) => {
  try {
    const { lang } = req.params;
    let page = await Webinar.findOne({ lang });
    if (!page) return res.status(404).json({ message: "not found" });
    page = await Webinar.findOneAndUpdate({ lang }, req.body, { new: true });

    return res
      .status(200)
      .json({ data: page, message: "webinar page is updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
