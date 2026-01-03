import { useReducer } from "react"
import { initialState, profileReducer } from "../reducers/ProfileReducer"
import { profileContext } from "../context";


const profileProvider = ({children}) => {

    const [state, dispatch] = useReducer(profileReducer, initialState);

    return (
        <profileContext.Provider value={{state, dispatch}}>
            {children}
        </profileContext.Provider>
    )
}

export default profileProvider;