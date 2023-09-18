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
    const { tabUrlName, localizedName } = req.body;
    const { error } = validateCreateTab({ tabUrlName, localizedName });
    if (error) return res.status(400).json({ message: error.message });

    // check that language in localizedName array should be unique
    const langs = localizedName.map((item) => item.lang);
    if (new Set(langs).size !== langs.length) {
      return res.status(400).json({ message: "duplicate languages" });
    }
    let lastOrder;
    const lastRecord = await Tab.find().sort({ order: -1 }).limit(1);
    if (lastRecord.length) {
      lastOrder = lastRecord[0].order;
    }
    const newTab = await Tab.create({
      tabUrlName,
      localizedName,
      order: lastOrder ? lastOrder + 1 : 1,
    });
    res
      .status(201)
      .json({ data: newTab, message: "The tab has been created successfully" });
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
    const { lang } = req.query;
    let tabs;
    if (lang) {
      tabs = await Tab.find(
        {
          "localizedName.lang": lang,
        },
        {
          tabUrlName: 1,
          "localizedName.$": 1,
        }
      );
    } else {
      tabs = await Tab.find();
    }
    res.status(200).json(tabs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update tab
 * @route /api/v0/tabs/:tabName
 * @method PUT
 * @access private (only admins)
 */
module.exports.updateTabCtrl = asyncHandler(async (req, res) => {
  try {
    const { tabName } = req.params;
    const { newTabUrlName, newLocalizedName, newOrder } = req.body;
    const tab = await Tab.findOne({ tabUrlName: tabName });
    if (!tab)
      return res
        .status(404)
        .json({ message: "the tab you trying to update doesn't exist" });

    // check that language in localizedName array should be unique
    const langs = newLocalizedName.map((item) => item.lang);
    if (new Set(langs).size !== langs.length) {
      return res.status(400).json({ message: "duplicate languages" });
    }
    const updatedTab = await Tab.findOneAndUpdate(
      { tabUrlName: tabName },
      {
        tabUrlName: newTabUrlName,
        localizedName: newLocalizedName,
        order: newOrder,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ data: updatedTab, message: "tab has been updated successfully" });
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
 * @desc delete single tab
 * @route /api/v0/tabs/:tabName
 * @method DELETE
 * @access private(only admins)
 */
module.exports.deleteTabCtrl = asyncHandler(async (req, res) => {
  try {
    const { tabName } = req.params;
    const isTabExist = await Tab.findOne({ tabUrlName: tabName });
    if (!isTabExist)
      return res.status(400).json({ message: "tab doesn't exist" });
    const deletedTab = await Tab.findOneAndDelete({ tabUrlName: tabName });
    res.status(200).json({
      data: deletedTab,
      message: "The tab has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

// want to make update order and when tab is deleted the orders reordered
