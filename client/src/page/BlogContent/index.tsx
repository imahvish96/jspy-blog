import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { fetchPostBySlug } from "../../redux/thunk/post.thunk";
import { IPostResponse, PostType } from "../../types/interfaces";
import { Loader } from "../../components";
import UserTag from "../../components/UserTag";

export function BlogContent() {
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState<PostType>({} as PostType);

  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response: IPostResponse = await dispatch(
          fetchPostBySlug(slug)
        ).unwrap();
        if (response.statusCode === 200) {
          setPostContent(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <article
        className="w-[50%] mx-auto mt-5 mb-5 not-prose bg-white p-5 rounded-lg"
        data-color-mode="light"
      >
        <div className="w-full h-[350px] rounded-lg overflow-hidden">
          <img
            src={postContent.coverImage}
            alt={postContent.author?.fullName}
            className="not-prose w-full h-full"
          />
        </div>
        <div className="mt-6">
          <UserTag
            avatar={postContent.author?.avatar}
            username={postContent.author?.username}
            createdAt={postContent?.createdAt}
          />
          <h1 className="text-5xl font-bold !mb-8">{postContent.title}</h1>
          <MDEditor.Markdown
            source={postContent.body}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </article>
    </>
  );
}
