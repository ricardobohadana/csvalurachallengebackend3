import { resolve } from "path";
import React, { createContext, useState } from "react";
import { axiosInstance } from "../global";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthentication: () => Promise<boolean>;
  getAuthorizationCookie: () => string;
  setAuthorizationCookie: (token: string) => void;
}

type Props = {
  children?: React.ReactNode;
};

const AuthenticationContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  checkAuthentication: () => new Promise(() => false),
  getAuthorizationCookie: () => "",
  setAuthorizationCookie: (token: string) => null,
});

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
    document.cookie = `${cookieName}=${cookieValue};`;
  }

  function getAuthorizationCookie() {
    return getCookie("accessToken");
  }

  function setAuthorizationCookie(token: string) {
    var cookieName = "accessToken";
    setCookie(cookieName, token, 10);
  }

  async function checkAuthentication() {
    let token = getAuthorizationCookie();

    if (token === "") return false;

    return (
      200 ===
      (await axiosInstance
        .get("/checkAuth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => resp.status)
        .catch((err) => err.response.status))
    );
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        checkAuthentication,
        getAuthorizationCookie,
        setAuthorizationCookie,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext, AuthenticationContextProvider };
