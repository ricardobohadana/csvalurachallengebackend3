import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import {
  AuthenticationContext,
  deleteCookie,
  getCookie,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

export function Navbar() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    AuthenticationContext
  );

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    axiosInstance
      .get("/checkAuth", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setIsAuthenticated(true);
          setUser(resp.data.user);
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setUser(null);
      });
  }, [setIsAuthenticated, setUser, isAuthenticated]);

  function handleLogout() {
    deleteCookie("accessToken");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/users/login");
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="#">
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu container">
        <div className="navbar-start">
          <Link href="/" passHref>
            <a
              className={"navbar-item" + (pathname === "/" ? " is-active" : "")}
            >
              <i className="mr-2 fas fa-home"></i>
              Início
            </a>
          </Link>
          <Link href="/users" passHref>
            <a
              className={
                "navbar-item" + (pathname === "/users" ? " is-active" : "")
              }
            >
              <i className="mr-2 fas fa-user"></i>
              Usuários
            </a>
          </Link>
          <Link href="/transfers" passHref>
            <a
              className={
                "navbar-item" + (pathname === "/transfers" ? " is-active" : "")
              }
            >
              <i className="mr-2 fa-solid fa-money-bill-transfer"></i>
              Transações
            </a>
          </Link>
        </div>
        <div className="navbar-end">
          {user && isAuthenticated ? (
            <div className="navbar-item">
              <div className="buttons">
                <span>
                  Bem vindo(a), <strong className="ml-1">{user.name}</strong>
                </span>
                <button
                  className="button is-text ml-3 mt-1"
                  onClick={handleLogout}
                >
                  Encerrar Sessão
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link href="/users/register" passHref>
                  <a className="button is-primary">
                    <strong>Cadastrar</strong>
                  </a>
                </Link>
                <Link href="/users/login" passHref>
                  <a className="button is-light">Entrar</a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
