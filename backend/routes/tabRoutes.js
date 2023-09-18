const {
  createTabCtrl,
  getAllTabsCtrl,
  deleteTabCtrl,
  updateTabCtrl,
  getTabPagesCtrl,
} = require("../controllers/tabController");

const router = require("express").Router();

// /api/v0/tabs
router.route("/").post(createTabCtrl).get(getAllTabsCtrl);

// /api/v0/tabs/:tabName
router.route("/:tabName").put(updateTabCtrl).delete(deleteTabCtrl);

// /api/v0/tabs/:tabName/pages
router.route("/:tabName/pages").get(getTabPagesCtrl);

module.exports = router;
