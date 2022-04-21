import { useRouter } from "next/router";
import React from "react";

export function Navbar() {
  const pathname = useRouter().pathname;
  console.log(pathname);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
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
      </div>

      <div id="navbarBasicExample" className="navbar-menu container">
        <div className="navbar-start">
          <a
            className={"navbar-item" + (pathname === "/" ? " is-active" : "")}
            href="/"
          >
            <i className="mr-2 fas fa-home"></i>
            Início
          </a>
          <a
            className={
              "navbar-item" + (pathname === "/users" ? " is-active" : "")
            }
            href="/users"
          >
            <i className="mr-2 fas fa-user"></i>
            Usuários
          </a>
          <a
            className={
              "navbar-item" + (pathname === "/transfers" ? " is-active" : "")
            }
            href="/transfers"
          >
            <i className="mr-2 fa-solid fa-money-bill-transfer"></i>
            Transações
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Cadastrar</strong>
              </a>
              <a className="button is-light">Entrar</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
