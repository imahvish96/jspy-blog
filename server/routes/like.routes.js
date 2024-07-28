const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  toggleCommentLike,
  togglePostLike,
  getLikedPosts,
} = require("../controllers/like.controllers.js");

const router = Router();

router.route("/").get(getLikedPosts);

// Secure Routes
router.route("/toggle-post-like:id").post(verifyJWT, togglePostLike);
router.route("/toggle/comment/like/:id").post(verifyJWT, toggleCommentLike);

module.exports = router;
