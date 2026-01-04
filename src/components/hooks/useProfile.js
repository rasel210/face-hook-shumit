import { useContext } from "react"
import { profileContext } from "../../context"


export const useProfile = () => {
    return useContext(profileContext);
};