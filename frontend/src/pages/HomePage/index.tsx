import { NextPage } from "next";
import React from "react";

export const HomePage: NextPage = () => {
  return (
    <>
      <div>
        <h1 className="is-size-4">
          Bem vindo ao site para cadastro de transações desenvolvido para o
          Alura Challenge.
        </h1>
        <p>
          Aqui é possível enviar arquivos csv contendo transações, cadastrar,
          editar e excluir usuários
        </p>
        <hr />
      </div>
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Ver Usuários</p>
            <a
              className="button is-white is-size-5 has-text-weight-bold"
              href="/users"
            >
              Usuários
            </a>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Ver Transações</p>
            <a
              className="button is-white is-size-5 has-text-weight-bold"
              href="/transfers"
            >
              Transações
            </a>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Cadastrar Transações</p>
            <a
              className="button is-white is-size-5 has-text-weight-bold"
              href="/transfers/create"
            >
              Criar Transação
            </a>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Entrar</p>
            <a
              className="button is-white is-size-5 has-text-weight-bold"
              href="/login"
            >
              Iniciar Sessão
            </a>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Registrar</p>
            <a
              className="button is-white is-size-5 has-text-weight-bold"
              href="/register"
            >
              Cadastrar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
