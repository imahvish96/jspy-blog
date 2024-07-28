// src/components/Comment.js
import React, { useState } from "react";

export const Comment = ({ comment }: any) => {
  const [reply, setReply] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);

  const handleReplySubmit = (e: any) => {
    e.preventDefault();
    if (reply.trim()) {
      setReplies([...replies, { author: "You", text: reply, replies: [] }]);
      setReply("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="p-4 border rounded bg-gray-100">
        <p className="font-semibold">{comment.author}</p>
        <p>{comment.text}</p>
        <button
          className="text-blue-500 text-sm mt-2"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className="mt-2">
            <textarea
              className="w-full p-2 border rounded"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      {replies.length > 0 && (
        <div className="ml-8 mt-4">
          {replies.map((reply: any, index: any) => (
            <Comment key={index} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};
