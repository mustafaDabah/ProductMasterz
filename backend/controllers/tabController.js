const asyncHandler = require("express-async-handler");
const { validateCreateTab, Tab } = require("../models/Tab");
const { ArticlePage } = require("../models/ArticlePage");

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
          order: 1,
          "localizedName.$": 1,
        }
      ).sort({ order: 1 });
    } else {
      tabs = await Tab.find().sort({ order: 1 });
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
    const { newTabUrlName, newLocalizedName, direction } = req.body;
    let currentTab = await Tab.findOne({ tabUrlName: tabName });
    if (!currentTab)
      return res
        .status(404)
        .json({ message: "the tab you trying to update doesn't exist" });

    // check that language in localizedName array should be unique
    if (newLocalizedName?.length) {
      const langs = newLocalizedName.map((item) => item.lang);
      if (new Set(langs).size !== langs.length) {
        return res.status(400).json({ message: "duplicate languages" });
      }
    }

    if (direction) {
      if (direction !== "up" && direction !== "down")
        return res.status(400).json({ message: "Invalid direction" });
      if (direction === "up") {
        if (currentTab.order === 1)
          return res.status(400).json({ message: "invalid order" });
        const tempOrder = currentTab.order;
        const fakeOrder = 100;
        const tabAbove = await Tab.findOneAndUpdate(
          { order: currentTab.order - 1 },
          { order: fakeOrder },
          { new: true }
        );
        currentTab = await Tab.findOneAndUpdate(
          { tabUrlName: tabName },
          { order: currentTab.order - 1 },
          { new: true }
        );
        await Tab.findOneAndUpdate(
          { order: fakeOrder },
          { order: tempOrder },
          { new: true }
        );
      } else {
        const tempOrder = currentTab.order;
        const fakeOrder = 100;
        const tabBelow = await Tab.findOneAndUpdate(
          { order: currentTab.order + 1 },
          { order: fakeOrder },
          { new: true }
        );
        if (!tabBelow)
          return res.status(400).json({ message: "invalid order" });
        currentTab = await Tab.findOneAndUpdate(
          { tabUrlName: tabName },
          { order: currentTab.order + 1 },
          { new: true }
        );
        await Tab.findOneAndUpdate(
          { order: fakeOrder },
          { order: tempOrder },
          { new: true }
        );
      }
    }
    const updatedTab = await Tab.findOneAndUpdate(
      { tabUrlName: tabName },
      {
        tabUrlName: newTabUrlName,
        localizedName: newLocalizedName,
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

    const tabsToUpdate = await Tab.find({ order: { $gt: deletedTab.order } });
    const updateOps = tabsToUpdate.map((tab) => ({
      updateOne: {
        filter: { _id: tab._id },
        update: { $set: { order: tab.order - 1 } },
      },
    }));

    await Tab.bulkWrite(updateOps);

    res.status(200).json({
      data: deletedTab,
      message: "The tab has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get tab pages
 * @route /api/v0/tabs/:tabName/pages
 * @method GET
 * @access public
 */
module.exports.getTabPagesCtrl = asyncHandler(async (req, res) => {
  try {
    const tab = await Tab.findOne({ tabUrlName: req.params.tabName });
    const { lang } = req.query;
    if (!tab)
      return res
        .status(404)
        .json({ message: "invalid tab name,tab not found" });
    let pages;
    if (lang) {
      pages = await ArticlePage.find({
        tabId: tab._id.toString(),
        lang,
      }).select("pageUrlName name lang order");
    } else {
      pages = await ArticlePage.find({
        tabId: tab._id.toString(),
      }).select("pageUrlName name lang order");
    }
    res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
