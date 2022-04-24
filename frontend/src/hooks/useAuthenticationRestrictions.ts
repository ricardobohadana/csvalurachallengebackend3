import { NextRouter, useRouter } from "next/router";
import { userInfo } from "os";
import { useContext, useEffect } from "react";
import {
  AuthenticationContext,
  deleteCookie,
  getCookie,
} from "../contexts/AuthenticationContext";
import { axiosInstance } from "../global";

function useAuthenticationRestrictions() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token === "") {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    axiosInstance
      .get("/checkAuth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        resp.status === 200 && setIsAuthenticated(true);
        setUser(resp.data.user);
      })
      .catch((err) => {
        err.response.status === 401 && setIsAuthenticated(false);
        deleteCookie("accessToken");
        setUser(null);
      });
  });
  if (!isAuthenticated) {
    return true;
  } else {
    return false;
  }
}

export { useAuthenticationRestrictions };
