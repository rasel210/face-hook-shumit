import React, { useState } from "react";
import { useProfile } from "../components/hooks/useProfile";
import EditIcon from "../assets/icons/edit.svg";
import useAxios from "../components/hooks/useAxios";
import CheckIcon from "../assets/icons/check.svg";

function Bio() {
  const { state } = useProfile();
  const { api } = useAxios();

  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button 
        onClick={() => setEditMode(true)}
        className="flex-center h-7 w-7 rounded-full">
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button className="flex-center h-7 w-7 rounded-full">
          <img src={CheckIcon} alt="Check" />
        </button>
      )}
    </div>
  );
}

export default Bio;
