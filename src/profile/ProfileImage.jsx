import React from "react";
import { useProfile } from "../components/hooks/useProfile";
import EditIcon from "../assets/icons/edit.svg";

function ProfileImage() {

  const {state} = useProfile();
  
  return (
    <>
      <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <img
          className="max-w-full"
          src={state?.user?.avatar}
          alt={state?.user?.firstname}
        />

        <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
        <img src={EditIcon} alt="Edit" />
        </button>
      </div>
      
    </>
  );
}

export default ProfileImage;
