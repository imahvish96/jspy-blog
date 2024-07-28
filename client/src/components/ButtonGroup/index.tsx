import React from "react";
import { BookmarkIcon, CommentIcon, LikeIcon } from "../../icons";

function index() {
  return (
    <div className="flex items-center pt-3">
      <div className="flex space-x-4 text-gray-600 justify-between w-full">
        <div>
          <button aria-label="Like">
            <LikeIcon /> 200 Heart
          </button>
          <button aria-label="Comment">
            <CommentIcon /> 80 Comments
          </button>
        </div>
        <button aria-label="Bookmark">
          <BookmarkIcon />
        </button>
      </div>
    </div>
  );
}

export default index;
