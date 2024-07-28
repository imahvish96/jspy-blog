import { useState, useEffect } from "react";
import { Card as BlogCard, Loader } from "../../components";
import httpClient from "../../api/httpClient";
import { getAllPostUrl } from "../../api/url.constant";
import { formateDate } from "../../utils";
import { PostsType, PostType } from "../../types/interfaces";

export const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostsType>({} as PostsType);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: PostsType = await httpClient.get(getAllPostUrl);
        setPost(result);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 mt-4 mb-4">
      {post.data.map((post: PostType) => {
        const createdAt = formateDate(post.createdAt);
        return (
          <div className="flex flex-wrap mt-4 first:mt-0" key={post._id}>
            <BlogCard
              id={post._id}
              slug={post.slug}
              title={post.title}
              description={post.body}
              coverImage={post.coverImage}
              author={post.author}
              date={createdAt}
            />
          </div>
        );
      })}
    </div>
  );
};
