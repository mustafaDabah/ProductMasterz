const {
  createTabCtrl,
  getAllTabsCtrl,
  deleteTabCtrl,
  updateTabCtrl,
} = require("../controllers/tabController");

const router = require("express").Router();

// /api/v0/tabs
router.route("/").post(createTabCtrl).get(getAllTabsCtrl);

// /api/v0/tabs/:tabName
router.route("/:tabName").put(updateTabCtrl).delete(deleteTabCtrl);

module.exports = router;
