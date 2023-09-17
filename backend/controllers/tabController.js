const asyncHandler = require("express-async-handler");
const { validateCreateTab, Tab } = require("../models/Tab");

/**
 * @desc
 * @route /api/v0/tabs
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
 * @desc create tab
 * @route /api/v0/tabs
 * @method POST
 * @access private (only admins)
 */
module.exports.createTabCtrl = asyncHandler(async (req, res) => {
  try {
    const { tabUrlName, localizedName, order } = req.body;
    const { error } = validateCreateTab({ tabUrlName, localizedName, order });
    if (error) return res.status(400).json({ message: error.message });

    // check that language in localizedName array should be unique
    const langs = localizedName.map((item) => item.lang);
    if (new Set(langs).size !== langs.length) {
      return res.status(400).json({ message: "duplicate languages" });
    }

    const newTab = await Tab.create(req.body);
    res
      .status(201)
      .json({ data: newTab, message: "tab is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
