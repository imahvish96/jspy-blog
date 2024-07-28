const { Router } = require("express");
const { upload } = require("../middlewares/multer.middlewares.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createPost,
  readPost,
  updatePosts,
  deletePost,
  updatePostCoverImage,
  getAllPosts,
  getPostBySlug,
} = require("../controllers/post.controllers.js");

const router = Router();

router.route("/posts").get(getAllPosts);
// Secure Routes
router
  .route("/create-post")
  .post(verifyJWT, upload.single("coverImage"), createPost);

router.route("/read-post/:id").get(readPost);
router.route("/:slug").get(getPostBySlug);
router.route("/update-post/:id").put(verifyJWT, updatePosts);
router.route("/delete-post/:id").post(verifyJWT, deletePost);

router
  .route("/change-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updatePostCoverImage);

module.exports = router;
