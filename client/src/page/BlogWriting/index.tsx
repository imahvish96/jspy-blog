import React, { ChangeEvent, useContext, useState } from "react";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { createPost } from "../../redux/thunk/post.thunk";
import { Loader } from "../../components";

const Button = () => {
  const { preview, dispatch } = useContext<any>(EditorContext);
  const click = () => {
    dispatch({
      preview: preview === "edit" ? "preview" : "edit",
    });
  };
  if (preview === "edit") {
    return (
      <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
      <polygon
        fill="currentColor"
        points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
      />
      <polygon
        fill="currentColor"
        points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
      />
    </svg>
  );
};

const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <Button />,
};

const Disable = () => {
  const { preview } = useContext<any>(EditorContext);
  return (
    <button disabled={preview === "preview"}>
      <svg viewBox="0 0 16 16" width="12px" height="12px">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

const customButton = {
  name: "disable",
  keyCommand: "disable",
  value: "disable",
  icon: <Disable />,
};

export function BlogWriting() {
  const [value, setValue] = React.useState<any>();
  const [showBasicEditorInfo, setShowBasicEditorInfo] =
    React.useState<boolean>(false);
  const [showTitleTips, setShowTitleTips] = React.useState<boolean>(false);
  const [showPublishTips, setShowPublishTips] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      if (!title || !value) {
        console.log("Please enter title and body");
        return;
      }
      if (!selectedImage) {
        console.log("Please select cover image");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", value);
      formData.append("coverImage", selectedImage);

      const res = await dispatch(createPost(formData)).unwrap();
      if (res.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex">
      <div
        className="container bg-white mt-5 mb-5 ml-28 p-5 w-6/12 rounded-lg"
        data-color-mode="light"
      >
        <div className="flex flex-col mb-6">
          <div className="flex mb-6 items-center">
            {preview ? (
              <img src={preview} alt="" width={200} className="mr-3 rounded" />
            ) : (
              ""
            )}
            <input
              type="file"
              className="hidden"
              id="cover"
              onChange={handleImageChange}
            />
            <label
              htmlFor="cover"
              className="flex justify-center items-center w-36 h-12 rounded-md border border-slate-800 cursor-pointer mb-6"
            >
              {preview ? "Change Cover" : "Upload Cover"}
            </label>
          </div>
          <input
            type="text"
            placeholder="New post title here..."
            className="pl-3 h-12 outline-none text-3xl"
            onFocus={() => {
              setShowTitleTips(true);
              setShowBasicEditorInfo(false);
              setShowPublishTips(false);
            }}
            onChange={(e) => {
              if (e.target.value) {
                setTitle(e.target.value);
              }
            }}
          />
        </div>

        <MDEditor
          value={value}
          preview="edit"
          extraCommands={[codePreview, customButton, commands.fullscreen]}
          onChange={(val) => setValue(val)}
          onFocus={() => {
            setShowBasicEditorInfo(true);
            setShowTitleTips(false);
            setShowPublishTips(false);
          }}
          minHeight={570}
          visibleDragbar={false}
          height="600px"
          style={{ boxShadow: "none" }}
        />

        <button
          className="bg-[#3470a3] text-white p-2 rounded mt-3"
          onClick={handlePublish}
          onMouseOver={() => {
            setShowPublishTips(true);
            setShowBasicEditorInfo(false);
            setShowTitleTips(false);
          }}
        >
          Publish
        </button>
      </div>
      <div className="w-6/12">
        <div
          className={`w-4/12 ml-6 relative top-[60px] transition-opacity duration-500 ${
            showTitleTips ? "opacity-100" : "opacity-0"
          } ${!showTitleTips && "pointer-events-none"}`}
        >
          <h4 className="font-bold">Writing a Great Post Title</h4>
          <ul className="list-disc pl-6 mt-2 mb-2">
            <li>
              Think of your post title as a super short (but compelling!)
              description — like an overview of the actual post in one short
              sentence.
            </li>
            <li className="mt-1">
              Use keywords where appropriate to help ensure people can find your
              post by search.
            </li>
          </ul>
        </div>
        <div
          className={`w-4/12 ml-6 relative top-[20px] transition-opacity duration-200 ${
            showBasicEditorInfo ? "opacity-100" : "opacity-0"
          } ${!showBasicEditorInfo && "pointer-events-none"}`}
        >
          <h4 className="font-bold">Editor Basics</h4>
          <ul className="list-disc pl-6 mt-2 mb-2">
            <li>Use Markdown to write and format posts.</li>
            <li className="mb-1 mt-1">
              Embed rich content such as Tweets, YouTube videos, etc. Use the
              complete URL: {`{% embed https://... %} `}{" "}
              <Link to="/url">See a list of supported embeds.</Link>
            </li>
            <li>
              In addition to images for the post's content, you can also drag
              and drop a cover image.
            </li>
          </ul>
        </div>
        <div
          className={`w-4/12 ml-6 relative top-[25px] transition-opacity duration-500 ${
            showPublishTips ? "opacity-100" : "opacity-0"
          } ${!showPublishTips && "pointer-events-none"}`}
        >
          <h4 className="font-bold">Publishing Tips</h4>
          <ul className="list-disc pl-6 mt-2 mb-2">
            <li>
              Ensure your post has a cover image set to make the most of the
              home feed and social media platforms.
            </li>
            <li className="mb-1 mt-1">
              Share your post on social media platforms or with your co-workers
              or local communities.
            </li>
            <li>
              Ask people to leave questions for you in the comments. It's a
              great way to spark additional discussion describing personally why
              you wrote it or why people might find it helpful.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
