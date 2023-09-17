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
    if (error.code === 11000)
      return res
        .status(500)
        .json({ message: `duplicate ${Object.keys(error.keyPattern)[0]}` });
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get all tabs
 * @route /api/v0/tabs
 * @method GET
 * @access private
 */
module.exports.getAllTabsCtrl = asyncHandler(async (req, res) => {
  try {
    const tabs = await Tab.find();
    res.status(200).json(tabs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
