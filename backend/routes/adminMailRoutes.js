const {
  createAdminMailCtrl,
  getAdminMailsCtrl,
} = require("../controllers/adminMailController");

const router = require("express").Router();

// /api/v0/admin-mails/
router.route("/").post(createAdminMailCtrl).get(getAdminMailsCtrl);
module.exports = router;
