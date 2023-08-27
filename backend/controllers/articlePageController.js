const asyncHandler = require("express-async-handler");
const {
  ArticlePage,
  validateCreatePage,
  validateGetPage,
  validateUpdatePage,
} = require("../models/ArticlePage");

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

    // check if there is a page with the same name and lang already exists
    const pageExist = await ArticlePage.findOne({
      name: req.body.name,
      lang: req.body.lang,
    });
    if (pageExist)
      return res.status(400).json({
        message: `'${req.body.name}' page with '${req.body.lang}' language already exists`,
      });

    const newPage = await ArticlePage.create(req.body);
    res.status(201).json({
      data: newPage,
      message: `${newPage.name} is created successfully`,
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
    const { error } = validateGetPage({ name: pageName, lang });
    if (error) return res.status(400).json({ message: error.message });

    const page = await ArticlePage.findOne({ name: pageName, lang });
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
 * @route /api/v0/pages/
 * @method GET
 * @access public
 */
module.exports.getAllArticlePagesCtrl = asyncHandler(async (req, res) => {
  try {
    const pageNames = await ArticlePage.find().select("name");
    return res.status(200).json(pageNames);
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
    const { error: PageParamsError } = validateGetPage({
      name: pageName,
      lang,
    });
    if (PageParamsError)
      return res.status(400).json({ message: PageParamsError.message });

    const { newPageName, newPageLang, navbar, header, content } = req.body;
    const { error } = validateUpdatePage({
      name: newPageName,
      lang: newPageLang,
      navbar,
      header,
      content,
    });
    if (error) return res.status(400).json({ message: error.message });

    let page = await ArticlePage.findOne({ name: pageName, lang });
    if (!page)
      return res.status(404).json({
        message: `'${pageName}' page with '${lang}' language is not found`,
      });

    page = await ArticlePage.findOneAndUpdate(
      { name: pageName, lang },
      {
        name: newPageName,
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
        message: `error - there is another page with the same name and language, try to change any one of them`,
      });
    }
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
    const { error } = validateGetPage({ name: pageName, lang });
    if (error) return res.status(400).json({ message: error.message });

    const pageExist = await ArticlePage.findOne({ name: pageName, lang });
    if (!pageExist)
      return res
        .status(404)
        .json({ message: `the page you trying to delete doesn't exist` });

    const deletedPage = await ArticlePage.findOneAndDelete({
      name: pageName,
      lang,
    });
    res.status(200).json({
      data: deletedPage,
      message: `'${pageName}' page with '${lang}' language is deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
