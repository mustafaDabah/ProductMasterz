const {
  createArticlePageCtrl,
  getAllArticlePagesCtrl,
  getSingleArticlePageCtrl,
  updateArticlePageCtrl,
  deleteArticlePageCtrl,
} = require("../controllers/articlePageController");

const router = require("express").Router();

// /api/v0/pages/
router.route("/").post(createArticlePageCtrl).get(getAllArticlePagesCtrl);

// /api/v0/pages/:pageName/:lang
router
  .route("/:pageName/:lang")
  .get(getSingleArticlePageCtrl)
  .put(updateArticlePageCtrl)
  .delete(deleteArticlePageCtrl);

module.exports = router;
