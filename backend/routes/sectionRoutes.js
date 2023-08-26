const {
  createSectionCtrl,
  getSectionCtrl,
  updateSectionCtrl,
  deleteSectionCtrl,
} = require("../controllers/sectionController");

const router = require("express").Router();

// /api/v0/sections
router.route("/").post(createSectionCtrl);

// /api/v0/sections/sectionName
router
  .route("/:sectionName")
  .get(getSectionCtrl)
  .put(updateSectionCtrl)
  .delete(deleteSectionCtrl);

module.exports = router;
