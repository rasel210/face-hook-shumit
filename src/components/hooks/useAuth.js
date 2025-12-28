import { useContext, useDebugValue } from "react";
import { AuthContext } from "../../context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(context?.auth, auth => auth?.user ? "Logged In" : "Logged Out");
  return context;
}

export default useAuth;