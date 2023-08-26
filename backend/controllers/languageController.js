const asyncHandler = require("express-async-handler");
const {
  validateCreateLanguage,
  Language,
  validateUpdateLanguage,
} = require("../models/Language");

/**
 * @desc
 * @route /api/v0/languages
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
 * @desc create language
 * @route /api/v0/languages/
 * @method POST
 * @access private (only admins)
 */
module.exports.createLanguageCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateLanguage(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const languageFound = await Language.findOne({ code: req.body.code });
    if (languageFound)
      return res.status(400).json({ message: "language already exist" });

    const newLanguage = await Language.create(req.body);

    res
      .status(201)
      .json({ data: newLanguage, message: "language is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get all languages
 * @route /api/v0/languages/
 * @method GET
 * @access public
 */
module.exports.getAllLanguagesCtrl = asyncHandler(async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get a language
 * @route /api/v0/languages/:langCode
 * @method GET
 * @access public
 */
module.exports.getLanguageCtrl = asyncHandler(async (req, res) => {
  try {
    const { langCode } = req.params;
    const languageFound = await Language.findOne({ code: langCode });

    if (!languageFound)
      return res.status(404).json({ message: "language not found" });

    res.status(200).json(languageFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update a language
 * @route /api/v0/languages/:langCode
 * @method PUT
 * @access private (only admin)
 */
module.exports.updateLanguageCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateUpdateLanguage(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { langCode } = req.params;
    const languageFound = await Language.findOne({ code: langCode });
    if (!languageFound)
      return res.status(404).json({ message: "language not found" });

    const updatedLanguage = await Language.findOneAndUpdate(
      { code: langCode },
      req.body,
      { new: true }
    );
    res.status(200).json({
      data: updatedLanguage,
      message: "language updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
