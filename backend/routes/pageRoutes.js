const {
  createPageCtrl,
  getPageCtrl,
  updatePageCtrl,
  deletePageCtrl,
  getAllPagesCtrl,
} = require("../controllers/pageController");

const router = require("express").Router();

// /api/v0/pages
router.route("/").post(createPageCtrl).get(getAllPagesCtrl);

// /api/v0/pages/:pageName
router
  .route("/:pageName")
  .get(getPageCtrl)
  .put(updatePageCtrl)
  .delete(deletePageCtrl);

module.exports = router;
