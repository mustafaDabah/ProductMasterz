const asyncHandler = require("express-async-handler");
const { Page } = require("../models/Page");
const { Section } = require("../models/Section");

/**
 * @desc
 * @route /api/v0/pages
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
 * @desc create a page
 * @route /api/v0/pages
 * @method POST
 * @access private
 */
module.exports.createPageCtrl = asyncHandler(async (req, res) => {
  try {
    const { name, parentName } = req.body;

    // check if page name already exists
    const pageFound = await Page.findOne({ name });
    if (pageFound)
      return res.status(400).json({ message: "page already exists" });

    // check if the parent exists
    let parent = null;
    if (parentName) {
      parent = await Page.findOne({ name: parentName });
      if (!parent)
        return res.status(400).json({ message: "parent is not found" });
    }
    const newPage = await Page.create({
      name,
      parent: parent?._id,
      route: parent ? `${parent?.route}/${name}` : `/${name}`,
    });
    res
      .status(201)
      .json({ data: newPage, message: "page is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get all pages
 * @route /api/v0/pages
 * @method GET
 * @access private (only admins)
 */
module.exports.getAllPagesCtrl = asyncHandler(async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get page
 * @route /api/v0/pages/:pageName
 * @method GET
 * @access private
 */
module.exports.getPageCtrl = asyncHandler(async (req, res) => {
  try {
    const { pageName } = req.params;
    const { lang } = req.cookies;
    let page = await Page.findOne({ name: pageName });
    if (!page)
      return res.status(404).json({ message: `${pageName} page is not found` });
    page = await Page.findOne({ name: pageName }).populate({
      path: "sections",
      match: { lang },
    });
    res.status(200).json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update page
 * @route /api/v0/pages/:pageName
 * @method PUT
 * @access private
 * @status not completed
 */
module.exports.updatePageCtrl = asyncHandler(async (req, res) => {
  try {
    const { pageName } = req.params;
    const { newParentName, newPageName } = req.body;
    // find if page you update is found or not
    const pageFound = await Page.findOne({ name: pageName });
    if (!pageFound)
      return res.status(404).json({ message: `${pageName} page is not found` });

    // find if the new page name is related to another page or not
    const nameExist = await Page.findOne({ name: newPageName });
    if (nameExist)
      return res.status(400).json({
        message: `${newPageName} name already assigned to another page`,
      });

    // check if the new parent exist or not
    let newParent;
    if (newParentName) {
      newParent = await Page.findOne({ name: newParentName });
      if (!newParent)
        return res.status(400).json({ message: "the new parent is not found" });
    }

    const updatedPage = await Page.findOneAndUpdate(
      { name: pageName },
      {
        name: newPageName,
        parent: newParent?._id,
        // TODO
        route:
          newParent && newPageName
            ? `${newParent.route}/${newPageName}`
            : newParent
            ? `${newParent.route}/${pageName}`
            : `${pageFound.route.substring(
                0,
                pageFound.route.length - pageName.length + 1
              )}/${newPageName}`,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      data: updatedPage,
      message: "page is updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc delete page
 * @route /api/v0/pages/pageName
 * @method DELETE
 * @access private
 */
module.exports.deletePageCtrl = asyncHandler(async (req, res) => {
  try {
    const { pageName } = req.params;
    const pageFound = await Page.findOne({ name: pageName });
    if (!pageFound)
      return res.status(404).json({ message: "page is not found" });

    // delete page sections
    await Section.deleteMany({
      pageId: pageFound._id,
    });
    const deletedPage = await Page.findOneAndDelete({
      name: pageFound.name,
    });
    res.status(200).json({
      data: deletedPage,
      message: `${pageName} page is deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
