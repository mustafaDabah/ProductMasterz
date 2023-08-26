const {
  getHomeCtrl,
  updateHomeCtrl,
} = require("../controllers/homePageController");

const router = require("express").Router();

// /api/v0/home/:lang
router.route("/:lang").get(getHomeCtrl).put(updateHomeCtrl);
module.exports = router;
