import { useProfile } from "./useProfile";

export const useAvatar = (post) => {
    const { state } = useProfile();
    console.log("useAvatar state:", state);

    const isMe = post?.author?.id === state?.user?.id;
    const avatar = isMe ? `${state?.user?.avatar}` : `${post?.author?.avatar}`;
    
    // Handle null, undefined, or invalid avatar values
    const validAvatar = avatar && avatar !== 'null' && avatar !== 'undefined' ? avatar : 'uploads/avatar/default-avatar.png';
    const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${validAvatar}`;

    return { avatarURL };
};