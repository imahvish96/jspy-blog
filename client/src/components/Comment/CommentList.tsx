// src/components/CommentList.js
import React, { useState } from "react";
import { Comment } from "./Comment";

export const CommentList = () => {
  const [comments, setComments] = useState<any>([]);
  const [newComment, setNewComment] = useState<any>("");

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { author: "You", text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
      {comments.length > 0 && (
        <div>
          {comments.map((comment: any, index: any) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
