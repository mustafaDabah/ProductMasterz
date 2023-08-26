const {
  getWebinarCtrl,
  updateWebinarCtrl,
} = require("../controllers/webinarPageController");

const router = require("express").Router();

// /api/v0/webinar/:lang
router.route("/:lang").get(getWebinarCtrl).put(updateWebinarCtrl);
module.exports = router;
