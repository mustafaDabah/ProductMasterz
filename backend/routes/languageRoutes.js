const {
  createLanguageCtrl,
  getLanguageCtrl,
  updateLanguageCtrl,
  getAllLanguagesCtrl,
} = require("../controllers/languageController");

const router = require("express").Router();

// /api/v0/languages/
router.route("/").post(createLanguageCtrl).get(getAllLanguagesCtrl);

// /api/v0/languages/:langCode
router.route("/:langCode").get(getLanguageCtrl).put(updateLanguageCtrl);

module.exports = router;
