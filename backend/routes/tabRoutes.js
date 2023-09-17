const {
  createTabCtrl,
  getAllTabsCtrl,
} = require("../controllers/tabController");

const router = require("express").Router();

// /api/v0/tabs
router.route("/").post(createTabCtrl).get(getAllTabsCtrl);

module.exports = router;
