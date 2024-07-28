const mongoose = require("mongoose");
const { Like } = require("../models/like.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

// import mongoose from "mongoose";
// import { Like } from "../models/like.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

const togglePostLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  //TODO: toggle like on video

  const like = await Like.findOne({ post: postId, author: req.user._id });
  if (like) {
    throw new ApiError(400, "You have already liked this post");
  }
  const newLike = await Like.create({
    video: postId,
    author: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, "Like created", newLike));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment

  const like = await Like.findOne({ comment: commentId, author: req.user._id });
  if (like) {
    throw new ApiError(400, "You have already liked this comment");
  }
  const newLike = await Like.create({
    comment: commentId,
    author: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, "Like created", newLike));
});

const getLikedPosts = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const likes = await Like.find({ author: req.user._id })
    .populate("post", "-__v")
    .populate("comment", "-__v");
  return res.status(200).json(new ApiResponse(200, "Likes found", likes));
});

module.exports = { toggleCommentLike, togglePostLike, getLikedPosts };
