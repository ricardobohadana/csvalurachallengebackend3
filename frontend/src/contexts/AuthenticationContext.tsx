import { resolve } from "path";
import React, { createContext, useState } from "react";
import { axiosInstance } from "../global";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  // checkAuthentication: () => Promise<boolean>;
  getAuthorizationCookie: () => string;
  setAuthorizationCookie: (token: string, user: User) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

type Props = {
  children?: React.ReactNode;
};

const AuthenticationContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  // checkAuthentication: () => new Promise(() => false),
  getAuthorizationCookie: () => "",
  setAuthorizationCookie: (token: string) => null,
  user: null,
  setUser: () => null,
});

function deleteCookie(cookieName: string) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

function AuthenticationContextProvider({ children }: Props) {
  function getCookie(cookieName: string) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie(cookieName: string) {
    let cookie = getCookie(cookieName);
    return cookie != "";
  }

  function setCookie(
    cookieName: string,
    cookieValue: string,
    minutesDuration: number
  ) {
    const d = new Date();
    d.setTime(d.getTime() + minutesDuration * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${cookieName}=${cookieValue};${expires}}`;
  }

  function getAuthorizationCookie() {
    const accessToken = getCookie("accessToken");
    if (accessToken === "") {
      if (isAuthenticated === true) setIsAuthenticated(false);
    } else {
      if (isAuthenticated === false) setIsAuthenticated(true);
    }

    return accessToken;
  }

  function setAuthorizationCookie(token: string, user: User) {
    var cookieName = "accessToken";
    setCookie(cookieName, token, 10);
    setIsAuthenticated(true);
    setUser(user);
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        // checkAuthentication,
        getAuthorizationCookie,
        setAuthorizationCookie,
        user,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext, AuthenticationContextProvider, deleteCookie };
