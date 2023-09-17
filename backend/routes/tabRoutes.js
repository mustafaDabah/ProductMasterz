const { createTabCtrl } = require("../controllers/tabController");

const router = require("express").Router();

// /api/v0/tabs
router.route("/").post(createTabCtrl);

module.exports = router;
