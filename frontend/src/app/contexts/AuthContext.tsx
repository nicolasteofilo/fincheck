import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACSESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    setSignedIn(false);
    localStorage.removeItem(localStorageKeys.ACSESS_TOKEN,)
  }, [])

  useEffect(() => {
    const storageAccessToken = localStorage.getItem(localStorageKeys.ACSESS_TOKEN);
    if (storageAccessToken) {
      setSignedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
