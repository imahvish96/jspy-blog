const Post = require("../models/post.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { uploadOnCloudinary } = require("../services/cloudinary.services");
const { ApiResponse } = require("../utils/ApiResponse");
const { generateSlug } = require("../utils");

// Create Post
const createPost = asyncHandler(async (req, res) => {
  // get title and body from the user
  // validate if its not empty
  // check for posts cover image
  // validate cover image
  // upload cover image to cloudinary
  // create new post
  // return response
  const { title, body } = req.body;

  if (!title?.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  if (!body?.trim() === "") {
    throw new ApiError(400, "Body is required");
  }

  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage) {
    throw new ApiError(500, "Failed to upload cover image");
  }

  const slug = generateSlug(title);

  const newPost = await Post.create({
    title,
    slug,
    body,
    author: req.user._id,
    coverImage: coverImage.url,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully", newPost));
});

// Read Post
const readPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate("author", "-password");
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return res.status(200).json(new ApiResponse(200, "Post found", post));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "-password");
  return res.status(200).json(new ApiResponse(200, "Posts found", posts));
});

// Update Post
const updatePosts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  console.log("test-log", req.body, req.params);

  console.log("test-log", title, body, id);
  if (title?.trim() === "") {
    throw new ApiError(400, "Title is required");
  }
  if (body?.trim() === "") {
    throw new ApiError(400, "Body is required");
  }

  if (!title || !body) {
    throw new ApiError(400, "Title and body are required");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        body,
      },
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Post updated successfully", updatedPost));
});

// Update post cover image
const updatePostCoverImage = asyncHandler(async (req, res) => {
  // get post id
  // check for posts cover image
  // validate cover image
  // upload cover image to cloudinary
  // update post
  // return response
  const { postId } = req.params;
  const coverImageLocalPath = req.files?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage) {
    throw new ApiError(500, "Failed to upload cover image");
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Cover image updated successfully", updatedPost)
    );
});

// Delete Post
const deletePost = asyncHandler(async (req, res) => {
  // get post id
  // delete post
  // return response
  const { postId } = req.params;
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully", deletedPost));
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  console.log("red", slug);
  const post = await Post.findOne({ slug }).populate("author", "-password");
  console.log("blue", post);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return res.status(200).json(new ApiResponse(200, "Post found", post));
});

module.exports = {
  createPost,
  readPost,
  updatePosts,
  deletePost,
  updatePostCoverImage,
  getAllPosts,
  getPostBySlug,
};
