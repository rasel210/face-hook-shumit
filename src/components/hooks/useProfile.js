import { useContext } from "react"
import { profileContext } from "../../context"


const useProfile = () => {
    return useContext(profileContext);
}

export default useProfile;