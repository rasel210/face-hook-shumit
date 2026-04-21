import React from "react";
import useAuth from "../components/hooks/useAuth";
import { usePost } from "./../components/hooks/usePost";
import useAxios from "./../components/hooks/useAxios";
import { useProfile } from "../components/hooks/useProfile";
import { useForm } from "react-hook-form";
import AddPhoto from "../assets/icons/addPhoto.svg";
import Field from "../common/Field";
import { actions } from "../Action";

function PostEntry( {onCreate, post}) {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: post?.content || "",
    },
  });

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = post?  await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`,
         formData 
      )
      : await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
         formData 
      );

      if (response.status === 200) {
        dispatch({
          type: post ? actions.post.DATA_EDITED : actions.post.DATA_CREATED, 
          data: response.data,
        });

        onCreate();

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
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        {post ? "Edit Post" : "Create Post"}
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="flex-center h-7 w-7 rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>
          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            {post ? "Update Post" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostEntry;
