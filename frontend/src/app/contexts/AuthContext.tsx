import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import { httpClient } from "../services/httpClient";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { queryClient } from "../../App";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(
      localStorageKeys.ACSESS_TOKEN
    );

    return !!storageAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACSESS_TOKEN, accessToken);
    httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    setSignedIn(false);
    localStorage.removeItem(localStorageKeys.ACSESS_TOKEN);
    queryClient.removeQueries();
  }, []);

  const { isError, isFetching, isSuccess,  } = useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => {
      return usersService.me();
    },
    enabled: signedIn,
  });

  useEffect(() => {
    if (isError) {
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout }}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
