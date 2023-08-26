const {
  createRegisteredLeadCtrl,
  getRegisteredLeadsCtrl,
} = require("../controllers/registeredLeadController");

const router = require("express").Router();

router.route("/").post(createRegisteredLeadCtrl).get(getRegisteredLeadsCtrl);

module.exports = router;
