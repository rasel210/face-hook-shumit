import { useState } from "react";

import ThreeDotsIcon from "../assets/icons/3dots.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import EditIcon from "../assets/icons/edit.svg";
import TimeIcon from "../assets/icons/time.svg";

import { useAvatar } from "../components/hooks/useAvatar";
import { getDateDifferenceFromNow } from "../utils";
import useAuth from "../components/hooks/useAuth";
import { usePost } from "../components/hooks/usePost";
import { actions } from "../Action";
import useAxios from "../components/hooks/useAxios";

const PostHeader = ({ post, onEdit }) => {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const isMe = post?.author?.id === auth?.user?.id;
  const { dispatch } = usePost();
  const { api } = useAxios();

  function toggleAction() {
    setShowAction(!showAction);
  }

  const handleDeletePost = async (e) => {
    e.preventDefault();

    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`,
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error,
      });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover lg:h-[58px] lg:w-[58px]"

          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
              post?.createAt,
            )} ago`}</span>
            <span className="text-sm text-gray-400 lg:text-base"></span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen"
              onClick={onEdit} >
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="action-menu-item hover:text-red-500"
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
