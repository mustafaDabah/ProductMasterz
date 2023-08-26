const {
  createNodeCtrl,
  deleteSingleNodeCtrl,
  getSingleNodeCtrl,
  getAllNodesCtrl,
  updateSingleNodeCtrl,
} = require("../controllers/nodeController");

const router = require("express").Router();

// /api/v0/nodes
router.route("/").post(createNodeCtrl).get(getAllNodesCtrl);

// /api/v0/nodes/:nodeSlug
router.route("/:nodeSlug").get(getSingleNodeCtrl);

// /api/v0/nodes/:nodeId
router.route("/:nodeId").put(updateSingleNodeCtrl).delete(deleteSingleNodeCtrl);

module.exports = router;
