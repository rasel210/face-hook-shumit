import React, { useState } from "react";
import PostCommentsList from "./PostCommentsList";
import useAxios from "../components/hooks/useAxios";
import useAuth from "../components/hooks/useAuth";

const PostComments = ({ post }) => {
  const {auth} = useAuth();
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  function toggleActions() {
    setShowComments(!showComments);
  }

  const { api } = useAxios();

  const addComment = async (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment },
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="h-7 w-7 rounded-full object-cover lg:h-[34px] lg:w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>

      <div className="mt-4">
        <button onClick={toggleActions} className="text-gray-300 max-md:text-sm">
          All Comment ▾
        </button>
        {showComments && <PostCommentsList comments={comments} />}
      </div>
    </div>
  );
};

export default PostComments;
