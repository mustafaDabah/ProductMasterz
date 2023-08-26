const {
  updateSingleTagCtrl,
  createTagCtrl,
  getAllTagsCtrl,
  getSingleTagCtrl,
  deleteSingleTagCtrl,
} = require("../controllers/tagController");

const router = require("express").Router();

// /api/v0/categories
router.route("/").post(createTagCtrl).get(getAllTagsCtrl);

// /api/v0/categories/:id
router
  .route("/:id")
  .post(createTagCtrl)
  .get(getSingleTagCtrl)
  .put(updateSingleTagCtrl)
  .delete(deleteSingleTagCtrl);
module.exports = router;
