import { NextPage } from "next";
import Link from "next/link";
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
            <Link passHref href="/users">
              <a className="button is-white is-size-5 has-text-weight-bold">
                Usuários
              </a>
            </Link>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Ver Transações</p>
            <Link href="/transfers" passHref>
              <a className="button is-white is-size-5 has-text-weight-bold">
                Transações
              </a>
            </Link>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Cadastrar Transações</p>
            <Link href="/transfers/create" passHref>
              <a className="button is-white is-size-5 has-text-weight-bold">
                Criar Transação
              </a>
            </Link>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Entrar</p>
            <Link href="/users/login" passHref>
              <a className="button is-white is-size-5 has-text-weight-bold">
                Iniciar Sessão
              </a>
            </Link>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Registrar</p>
            <Link href="/users/register" passHref>
              <a className="button is-white is-size-5 has-text-weight-bold">
                Cadastrar
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
