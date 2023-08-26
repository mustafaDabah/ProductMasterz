const asyncHandler = require("express-async-handler");
const {
  Node,
  validateCreateNode,
  validateUpdateNode,
} = require("../models/Node");
const { Tag } = require("../models/Tag");
const {
  NodeContent,
  validateUpdateNodeContent,
  validateCreateNodeContent,
} = require("../models/NodeContent");
const { Language } = require("../models/Language");

/**
 * @desc
 * @route /api/v0/nodes
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
 * @desc create a node
 * @route /api/v0/nodes
 * @method POST
 * @access private (only admin)
 */
module.exports.createNodeCtrl = asyncHandler(async (req, res) => {
  /** PROBLEMS
   * 1- creating a node for first time must have a content
   * 2- creating a node content with checking that is having different language
   * 3- update a node content
   *
   ** TYPES OF REQUESTS
   * - post request of new node that has one or more nodeContent
   * - post request of existing node that and need to add one or more new nodeContent
   *
   ** SOLUTIONS
   * - check if the node exists or not
   *    - if it exists  => check if the content language exists or not
   *            - if content language => return that node content is exist
   *            - else => create only the node content
   *    - else => you need to create the node with it's content --DONE
   * - you need to change the body structure that you will make node fields to be fixed and in make a nodeContents scope to put nodecontents in it -- DONE
   */
  try {
    const { tagIds, slug, keywords, nodeContents } = req.body;
    const { error } = validateCreateNode({
      tagIds,
      slug,
      keywords,
    });
    if (error) return res.status(400).json({ message: error.message });

    const nodeFound = await Node.findOne({ slug });
    if (nodeFound) {
      if (nodeContents.length <= 0)
        return res.status(400).json({ message: "please provide node content" });

      for (let i = 0; i < nodeContents.length; i++) {
        const { langCode, title, description, content, thumbnailUrl } =
          nodeContents[i];
        const { error: nodeContentError } = validateCreateNodeContent({
          nodeId: nodeFound._id.toString(),
          langCode,
          title,
          description,
          content,
          thumbnailUrl,
        });
        if (nodeContentError) {
          return res.status(400).json({ message: nodeContentError.message });
        }

        const nodeContentFound = await NodeContent.findOne({
          nodeId: nodeFound._id,
          langCode,
        });
        if (nodeContentFound) continue;

        const languageFound = await Language.findOne({ code: langCode });
        if (!languageFound)
          return res.status(404).json({ message: "invalid language" });
        await NodeContent.create({
          nodeId: nodeFound._id,
          langCode,
          title,
          description,
          content,
          thumbnailUrl,
        });
      }
      const node = await Node.findById(nodeFound._id)
        .populate("tagIds")
        .populate("nodeContents");
      res
        .status(201)
        .json({ data: node, message: "node content added successfully" });
    } else {
      for (let i = 0; i < tagIds?.length; i++) {
        const tagFound = await Tag.findById(tagIds[i]);
        if (!tagFound) return res.status(404).json({ message: "invalid tag" });
      }
      let newNode = await Node.create({
        tagIds,
        slug,
        keywords,
      });

      if (nodeContents.length <= 0)
        return res.status(400).json({ message: "provide node content" });
      for (let i = 0; i < nodeContents.length; i++) {
        const { langCode, title, description, content, thumbnailUrl } =
          nodeContents[i];
        const { error: nodeContentError } = validateCreateNodeContent({
          nodeId: newNode._id.toString(),
          langCode,
          title,
          description,
          content,
          thumbnailUrl,
        });
        if (nodeContentError) {
          await Node.findByIdAndDelete(newNode._id);
          return res.status(400).json({ message: nodeContentError.message });
        }
        const languageFound = await Language.findOne({ code: langCode });
        if (!languageFound)
          return res.status(404).json({ message: "invalid language" });
        await NodeContent.create({
          nodeId: newNode._id,
          langCode,
          title,
          description,
          content,
          thumbnailUrl,
        });
      }

      newNode = await Node.findById(newNode._id)
        .populate("tagIds")
        .populate("nodeContents");

      res.status(201).json({
        data: newNode,
        message: "node successfully created",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get all nodes
 * @route /api/v0/nodes
 * @method GET
 * @access private (only admin)
 */
module.exports.getAllNodesCtrl = asyncHandler(async (req, res) => {
  try {
    // TODO: return nodes based on language
    const nodes = await Node.find().populate("tagIds").populate("nodeContents");
    res.status(200).json(nodes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc get single node using slug
 * @route /api/v0/nodes/:nodeSlug
 * @method GET
 * @access public
 */
module.exports.getSingleNodeCtrl = asyncHandler(async (req, res) => {
  try {
    // TODO: return node based on language
    const { nodeSlug } = req.params;
    const nodeFound = await Node.findOne({ slug: nodeSlug });
    if (!nodeFound) return res.status(404).json({ message: "node not found" });

    const node = await Node.findOne({ slug: nodeSlug })
      .populate("tagIds")
      .populate("nodeContents");

    res.status(200).json(node);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc update a node
 * @route /api/v0/nodes/:nodeId
 * @method PUT
 * @access private (only admin)
 */
module.exports.updateSingleNodeCtrl = asyncHandler(async (req, res) => {
  try {
    /**
     * PROBLEMS:
     *  - if i want to update only the slug, i mean i will not update the nodeContent, therefore i will not send langCode or any thing related to nodeContent
     */
    const {
      tagIds,
      slug,
      keywords,
      title,
      description,
      content,
      thumbnailUrl,
      langCode,
      newLangCode,
    } = req.body;
    const { error } = validateUpdateNode({ tagIds, slug, keywords });
    if (error) return res.status(400).json({ message: error.message });

    // TODO: if tag is invalid should i return an error msg or create this tag
    for (let i = 0; i < tagIds?.length; i++) {
      const tagFound = await Tag.findById(tagIds[i]);
      if (!tagFound) return res.status(404).json({ message: "invalid tag" });
    }

    const { nodeId } = req.params;
    const nodeFound = await Node.findById(nodeId);
    if (!nodeFound) return res.status(404).json({ message: "node not found" });

    // 1-check if req body include the langCode
    if (!langCode)
      return res.status(400).json({ message: "language code is required" });
    // 2- check if the langCode reflects a existing language in language model
    const languageFound = await Language.findOne({ code: langCode });
    if (!languageFound)
      return res.status(404).json({ message: "invalid language code" });

    if (newLangCode) {
      const newLanguageFound = await Language.findOne({ code: newLangCode });
      if (!newLanguageFound)
        return res.status(404).json({ message: "invalid new language code" });
    }

    const updatednodeContent = await NodeContent.findOneAndUpdate(
      { nodeId, langCode },
      { langCode: newLangCode, title, description, content, thumbnailUrl },
      { new: true }
    );
    if (!updatednodeContent)
      return res
        .status(404)
        .json({ message: "the content you trying to update does not exist" });

    const updatedNode = await Node.findByIdAndUpdate(
      nodeId,
      {
        tagIds,
        slug,
        keywords,
      },
      {
        new: true,
      }
    )
      .populate("tagIds")
      .populate("nodeContents");

    res.status(200).json({ updatedNode });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc delete single node
 * @route /api/v0/nodes/:nodeId
 * @method DELETE
 * @access private (only admin)
 */
module.exports.deleteSingleNodeCtrl = asyncHandler(async (req, res) => {
  try {
    const { nodeId } = req.params;
    const nodeFound = await Node.findById(nodeId);
    if (!nodeFound)
      return res.status(404).json({
        message: "The node could not be found, it may have been deleted",
      });
    // DELETE Node and it's content
    const deletedNodeContent = await NodeContent.deleteMany({ nodeId });
    const node = await Node.findByIdAndDelete(nodeId);
    res.status(200).json({ data: node, message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
