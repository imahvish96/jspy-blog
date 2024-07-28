import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const comments = await Comment.find({ video: videoId })
    .populate("author", "-password")
    .limit(limit * 1)
    .skip((page - 1) * limit);
  return res.status(200).json(new ApiResponse(200, "Comments found", comments));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { body } = req.body;
  const comment = await Comment.create({
    body,
    author: req.user._id,
    video: videoId,
  });
  return res.status(201).json(new ApiResponse(201, "Comment created", comment));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const { body } = req.body;
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        body,
      },
    },
    { new: true }
  );
  return res.status(200).json(new ApiResponse(200, "Comment updated", comment));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  const comment = await Comment.findByIdAndDelete(commentId);
  return res.status(200).json(new ApiResponse(200, "Comment deleted", comment));
});

export { getVideoComments, addComment, updateComment, deleteComment };
