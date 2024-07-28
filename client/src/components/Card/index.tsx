import { Link } from "react-router-dom";
import { BookmarkIcon, CommentIcon, LikeIcon } from "../../icons";
import { IAuthor } from "../../types/interfaces";

type ICardPops = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  author: IAuthor;
  date: string;
};

export const Card = ({ slug, title, author, date, coverImage }: ICardPops) => {
  return (
    <>
      <div className="w-[60%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden border">
        <Link to={`/read/${slug}`} className="flex ">
          {coverImage && (
            <div className="flex-shrink-0 flex-grow-0 basis-[250px] border">
              <img
                src={coverImage}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-6 pb-6 w-full border">
            <div className="flex items-center mb-4">
              <div className="w-9 h-9 mr-4">
                <img
                  src={author.avatar}
                  alt={author.username}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {author.username}
                    </p>
                    <p className="text-gray-600">{date}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <div className="flex flex-wrap mt-2">
                {/* {hashtags.map((hashtag, index) => ( */}
                <span
                  key={0}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                >
                  #javascript
                </span>
                {/* ))} */}
              </div>
            </div>

            <div className="flex items-center pt-3">
              <div className="flex space-x-4 text-gray-600 justify-between w-full">
                <div className="flex gap-3">
                  <button
                    aria-label="Like"
                    className="flex w-auto gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded"
                  >
                    <LikeIcon /> <span className="text-sm">200 Heart</span>
                  </button>
                  <button
                    aria-label="Comment"
                    className="flex w-auto gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded"
                  >
                    <CommentIcon /> <span className="text-sm">80 Comments</span>
                  </button>
                </div>
                <button
                  aria-label="Bookmark"
                  className="flex w-auto gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded"
                >
                  <BookmarkIcon />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
