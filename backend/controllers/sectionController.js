const asyncHandler = require("express-async-handler");
const { Section, validateCreateSection } = require("../models/Section");
const { Page } = require("../models/Page");

/**
 * @desc
 * @route /api/v0/sections
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
 * @desc create a section
 * @route /api/v0/sections
 * @method POST
 * @access private
 */
module.exports.createSectionCtrl = asyncHandler(async (req, res) => {
  try {
    const { name, html, lang, pageName } = req.body;
    const { error } = validateCreateSection(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const sectionFound = await Section.findOne({ name, lang });
    if (sectionFound)
      return res
        .status(400)
        .json({
          message: `${name} section already exists with ${lang} language`,
        });

    const page = await Page.findOne({ name: pageName });
    if (!page)
      return res
        .status(404)
        .json({ message: `${pageName} page doesn't exist` });
    const newSection = await Section.create({
      name,
      html,
      lang,
      pageId: page._id.toString(),
    });
    res.status(201).json({
      data: newSection,
      message: `${name} section is created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get section
 * @route /api/v0/sections/:sectionName
 * @method GET
 * @access private
 */
module.exports.getSectionCtrl = asyncHandler(async (req, res) => {
  try {
    const { sectionName } = req.params;
    const section = await Section.findOne({ name: sectionName });
    if (!section)
      return res.status(404).json({ message: "section is not found" });
    res.status(200).json(section);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update section
 * @route /api/v0/sections/:sectionName
 * @method PUT
 * @access private
 */
module.exports.updateSectionCtrl = asyncHandler(async (req, res) => {
  try {
    const { sectionName } = req.params;
    const sectionFound = await Section.findOne({ name: sectionName });
    if (!sectionFound)
      return res.status(404).json({ message: "section is not found" });
    const nameExist = await Section.findOne({ name: req.body.name });
    if (nameExist)
      return res.status(400).json({ message: "section name already exists" });

    const updatedSection = await Section.findOneAndUpdate(
      { name: sectionName },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      data: updatedSection,
      message: "section is updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc delete section
 * @route /api/v0/sections/sectionName
 * @method DELETE
 * @access private
 */
module.exports.deleteSectionCtrl = asyncHandler(async (req, res) => {
  try {
    const { sectionName } = req.params;
    const sectionFound = await Section.findOne({ name: sectionName });
    if (!sectionFound)
      return res.status(404).json({ message: "section is not found" });
    const deletedSection = await Section.findOneAndDelete({
      name: sectionName,
    });
    res.status(200).json({
      data: deletedSection,
      message: "section is deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
