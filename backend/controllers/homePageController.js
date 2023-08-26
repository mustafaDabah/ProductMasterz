const asyncHandler = require("express-async-handler");
const { Home } = require("../models/Home");

/**
 * @desc
 * @route /api/v0/home
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
 * @desc get home page
 * @route /api/v0/home/:lang
 * @method GET
 * @access public
 */
module.exports.getHomeCtrl = asyncHandler(async (req, res) => {
  try {
    const { lang } = req.params;
    const page = await Home.findOne({ lang });
    if (!page) return res.status(404).json({ message: "not found" });
    return res.status(200).json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update home page
 * @route /api/v0/home/:lang
 * @method PUT
 * @access private( only admins)
 */
module.exports.updateHomeCtrl = asyncHandler(async (req, res) => {
  try {
    const { lang } = req.params;
    let page = await Home.findOne({ lang });
    if (!page) return res.status(404).json({ message: "not found" });
    page = await Home.findOneAndUpdate({ lang }, req.body, { new: true });

    return res
      .status(200)
      .json({ data: page, message: "home page is updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
