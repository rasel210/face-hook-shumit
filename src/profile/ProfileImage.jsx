import React, { useRef } from "react";
import { useProfile } from "../components/hooks/useProfile";
import EditIcon from "../assets/icons/edit.svg";
import { api } from "../api";
import { actions } from "../Action";

function ProfileImage() {
  const { state, dispatch } = useProfile();

  const fileUploadRef = useRef();

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();

      for (const file of fileUploadRef.current.files) {
        formData.append("avatar", file);
      }
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <>
      <div
        className="relative mb-8 h-[180px] w-[180px] overflow-hidden rounded-full 
      lg:mb-11 lg:h-[218px] lg:w-[218px]"
      >
        <img
          className="h-full w-full rounded-full object-cover"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
          alt={state?.user?.firstName}
        />

        <form>
          <button
            className="flex-center absolute bottom-4 right-4 h-7 w-7 
          rounded-full bg-black/50 hover:bg-black/80"
            type="submit"
          >
            <img src={EditIcon} alt="Edit" onClick={handleImageUpload} />
          </button>
          <input id="file" type="file" ref={fileUploadRef} hidden />
        </form>
      </div>
    </>
  );
}

export default ProfileImage;
