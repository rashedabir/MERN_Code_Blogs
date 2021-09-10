const router = require("express").Router();
const blogCtrl = require("../controller/blogCtrl");
const auth = require("../middleware/auth");

router.route("/blogs").get(blogCtrl.getBlogs).post(auth, blogCtrl.createBlog);

router
  .route("/blogs/:id")
  .delete(auth, blogCtrl.deleteBlogs)
  .put(auth, blogCtrl.updateBlogs);

module.exports = router;
