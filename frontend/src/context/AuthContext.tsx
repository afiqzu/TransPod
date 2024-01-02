import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import {
  checkRegisteredUser,
  getCurrentUser,
  getProviderAccessToken,
} from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthUser = async () => {
    try {
      await checkRegisteredUser();
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initAuthCheck = async () => {
      const cookieFallback = localStorage.getItem("cookieFallback");
      let isAuthenticated = false;

      if (cookieFallback === "[]" || cookieFallback === null) {
        const token = await getProviderAccessToken();
        isAuthenticated = !!token;

        if (!isAuthenticated) {
          navigate("/");
        }
      }
      setIsLoading(false);
    };
    initAuthCheck();
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
