import { useEffect, useState } from "react";

import { AuthContext } from "../context";

const AUTH_STORAGE_KEY = "auth";

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        try {
            return storedAuth ? JSON.parse(storedAuth) : {};
        } catch {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            return {};
        }
    });

    useEffect(() => {
        if (auth?.authToken) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [auth]);
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
