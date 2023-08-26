const { Node } = require("../models/Node");
const { Tag, validateCreateTag, validateUpdateTag } = require("../models/Tag");
const asyncHandler = require("express-async-handler");

/**
 * @desc
 * @route /api/v0/tags
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
 * @desc create tag
 * @route /api/v0/tags
 * @method POST
 * @access private(only admin)
 */
module.exports.createTagCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateTag(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { name } = req.body;

    const newTag = await Tag.create({ name });
    res.status(201).json({ data: newTag, message: "tag successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get all tags
 * @route /api/v0/tags
 * @method GET
 * @access public
 */
module.exports.getAllTagsCtrl = asyncHandler(async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get single tag
 * @route /api/v0/tags/:id
 * @method GET
 * @access public
 */
module.exports.getSingleTagCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const tagFound = await Tag.findById(id);
    if (!tagFound) return res.status(404).json({ message: "tag not found" });

    const tag = await Tag.findById(id);
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update a tag
 * @route /api/v0/tags/:id
 * @method PUT
 * @access private (only admin)
 */
module.exports.updateSingleTagCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateUpdateTag(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { id } = req.params;
    const tagFound = await Tag.findById(id);
    if (!tagFound) return res.status(404).json({ message: "tag not found" });

    const updatedTag = await Tag.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc delete single tag
 * @route /api/v0/tags/:id
 * @method DELETE
 * @access private (only admin)
 */
module.exports.deleteSingleTagCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const tagFound = await Tag.findById(id);
    if (!tagFound)
      return res.status(404).json({
        message: "The tag could not be found, it may have been deleted",
      });

    const tag = await Tag.findByIdAndDelete(id);

    // TODO: delete this tag from the Nodes that have this tag

    res.status(200).json({ data: tag, message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get nodes related to a tag
 * @route /api/v0/tags/:tagName/nodes
 * @method GET
 * @access public
 */
module.exports.getTagNodesCtrl = asyncHandler(async (req, res) => {
  try {
    const { tagName } = req.params;

    const tagFound = await Tag.findOne({ name: tagName });
    if (!tagFound) return res.status(404).json({ message: "tag not found" });

    const nodes = await Node.find({ tagId: tagFound._id });
    res.status(200).json(nodes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
