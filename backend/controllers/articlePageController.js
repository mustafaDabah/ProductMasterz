const asyncHandler = require("express-async-handler");
const {
  ArticlePage,
  validateCreatePage,
  validateUpdatePage,
} = require("../models/ArticlePage");
const { Tab } = require("../models/Tab");

/**
 * @desc
 * @route /api/v0/pages/:pageName/:lang
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
 * @desc create single page
 * @route /api/v0/pages/
 * @method POST
 * @access private (only admin)
 */
module.exports.createArticlePageCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreatePage(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // check if there is a page with the same pageUrlName and lang already exists
    const pageExist = await ArticlePage.findOne({
      pageUrlName: req.body.pageUrlName,
      lang: req.body.lang,
    });
    if (pageExist)
      return res.status(400).json({
        message: `'${req.body.pageUrlName}' page with '${req.body.lang}' language already exists`,
      });

    const page = await ArticlePage.findOne({
      pageUrlName: req.body.pageUrlName,
    });
    const pageOrder = page?.order;

    if (req.body.tabId) {
      const tabExist = await Tab.findById(req.body.tabId);
      if (!tabExist) return res.status(400).json({ message: "invalid tab id" });
    }

    let lastOrder;
    const lastRecord = await ArticlePage.find().sort({ order: -1 }).limit(1);
    if (lastRecord.length) {
      lastOrder = lastRecord[0].order;
    }

    const pageUrlNameExist = await ArticlePage.find({
      pageUrlName: req.body.pageUrlName,
    });
    if (pageUrlNameExist.length) {
      await ArticlePage.updateMany(
        { pageUrlName: req.body.pageUrlName },
        { tabId: req.body.tabId },
        { new: true }
      );
    }
    const newPage = await ArticlePage.create({
      ...req.body,
      order: pageOrder ? pageOrder : lastOrder ? lastOrder + 1 : 1,
    });
    res.status(201).json({
      data: newPage,
      message: `${newPage.pageUrlName} is created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get single page
 * @route /api/v0/pages/:pageName/:lang
 * @method GET
 * @access public
 */
module.exports.getSingleArticlePageCtrl = asyncHandler(async (req, res) => {
  try {
    const { pageName, lang } = req.params;

    const page = await ArticlePage.findOne({ pageUrlName: pageName, lang });
    if (!page)
      return res.status(404).json({
        message: `${pageName} page with '${lang}' language is not found`,
      });

    return res.status(200).json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get all page names
 * @route /api/v0/pages
 * @method GET
 * @access public
 */
module.exports.getAllArticlePagesCtrl = asyncHandler(async (req, res) => {
  try {
    const pages = await ArticlePage.aggregate([
      {
        $group: {
          _id: "$pageUrlName",
          langs: { $push: "$lang" },
        },
      },
      {
        $project: {
          pageUrlName: "$_id",
          langs: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update a page
 * @route /api/v0/pages/:pageName/:lang
 * @method PUT
 * @access private( only admins)
 */
module.exports.updateArticlePageCtrl = asyncHandler(async (req, res) => {
  try {
    const { pageName, lang } = req.params;

    const {
      newPageName,
      newPageLang,
      newName,
      newTabId,
      navbar,
      header,
      content,
      direction,
    } = req.body;
    const { error } = validateUpdatePage({
      pageUrlName: newPageName,
      lang: newPageLang,
      name: newName,
      tabId: newTabId,
      navbar,
      header,
      content,
    });
    if (error) return res.status(400).json({ message: error.message });

    let currentPage = await ArticlePage.findOne({
      pageUrlName: pageName,
      lang,
    });
    if (!currentPage)
      return res.status(404).json({
        message: `'${pageName}' page with '${lang}' language is not found`,
      });

    if (direction) {
      if (direction !== "up" && direction !== "down")
        return res.status(400).json({ message: "Invalid direction" });
      if (direction === "up") {
        if (currentPage.order === 1)
          return res.status(400).json({ message: "invalid order" });
        const tempOrder = currentPage.order;
        const fakeOrder = 10000000;
        await ArticlePage.updateMany(
          { order: currentPage.order - 1 },
          { order: fakeOrder },
          { new: true }
        );
        await ArticlePage.updateMany(
          { pageUrlName: pageName },
          { order: currentPage.order - 1 },
          { new: true }
        );
        await ArticlePage.updateMany(
          { order: fakeOrder },
          { order: tempOrder },
          { new: true }
        );
      } else {
        const tempOrder = currentPage.order;
        const fakeOrder = 10000000;
        const pagesBelow = await ArticlePage.updateMany(
          { order: tempOrder + 1 },
          { order: fakeOrder },
          { new: true }
        );
        if (pagesBelow.modifiedCount <= 0)
          return res.status(400).json({ message: "invalid order" });
        currentPage = await ArticlePage.updateMany(
          { pageUrlName: pageName },
          { order: currentPage.order + 1 },
          { new: true }
        );
        await ArticlePage.updateMany(
          { order: fakeOrder },
          { order: tempOrder },
          { new: true }
        );
      }
    }
    if (newTabId) {
      const tabExist = await Tab.findById(newTabId);
      if (!tabExist) return res.status(400).json({ message: "invalid tab id" });

      await ArticlePage.updateMany(
        { pageUrlName: pageName },
        { tabId: newTabId },
        { new: true }
      );
    }
    page = await ArticlePage.findOneAndUpdate(
      { pageUrlName: pageName, lang },
      {
        pageUrlName: newPageName,
        name: newName,
        lang: newPageLang,
        navbar,
        header,
        content,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: page,
      message: `'${pageName}' page with '${lang}' language is updated successfully`,
    });
  } catch (error) {
    if (error.codeName === "DuplicateKey") {
      return res.status(400).json({
        message: `error - there is another page with the same pageUrlName and language, try to change any one of them`,
      });
    }
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc delete single page
 * @route /api/v0/pages/:pageName/:lang
 * @method DELETE
 * @access private (only admins)
 */
module.exports.deleteArticlePageCtrl = asyncHandler(async (req, res) => {
  try {
    const { pageName, lang } = req.params;

    const pageExist = await ArticlePage.findOne({
      pageUrlName: pageName,
      lang,
    });
    if (!pageExist)
      return res
        .status(404)
        .json({ message: `the page you trying to delete doesn't exist` });

    const deletedPages = await ArticlePage.deleteMany({
      pageUrlName: pageName,
    });

    const pagesToUpdate = await ArticlePage.find({
      order: { $gt: pageExist.order },
    });

    const updatePromises = pagesToUpdate.map((page) => {
      return ArticlePage.updateOne(
        {
          _id: page._id,
        },
        {
          $inc: {
            order: -1,
          },
        }
      );
    });

    await Promise.all(updatePromises);

    res.status(200).json({
      data: {
        pageUrlName: pageName,
        order: pageExist.order,
      },
      message: `'${pageName}' pages language are deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
