import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { axiosInstance } from "../../global";
import { Card } from "../Card";

type Props = {
  isRegister: boolean;
};

function NewUserForm({ isRegister }: Props) {
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isEmailIncorrect, setIsEmailIncorrect] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("placeholder");
  const [successful, setSuccessful] = useState<null | boolean>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    let email = e.target.value;
    if (email.includes("@") && email.includes(".")) {
      setIsEmailCorrect(true);
      setIsEmailIncorrect(false);
      setEmail(email);
    } else {
      setIsEmailCorrect(false);
      setIsEmailIncorrect(true);
    }
  }

  function handleSubmit() {
    setSuccessful(null);
    if (submitButtonRef.current) {
      submitButtonRef.current.classList.add("is-loading");
    }
    axiosInstance
      .post("/register", {
        name: name,
        email: email,
      })
      .then((resp) => {
        console.log(resp.status);
        if (resp.status === 201) {
          setSuccessful(true);
        }
        if (submitButtonRef.current) {
          submitButtonRef.current.classList.remove("is-loading");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSuccessful(false);
        if (submitButtonRef.current) {
          submitButtonRef.current.classList.remove("is-loading");
        }
      });
  }

  return (
    <Card title="Cadastro de usuário">
      <div className="field">
        <label htmlFor="" className="label">
          Email:
        </label>
        <p className="control has-icons-left has-icons-right">
          <input
            type="email"
            className={
              "input " +
              (isEmailCorrect && " is-success ") +
              (isEmailIncorrect && " is-danger ")
            }
            placeholder="Insira seu email"
            onChange={handleEmailChange}
          />
          {isEmailCorrect && (
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          )}
          {isEmailIncorrect && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}

          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <label htmlFor="" className="label">
          Nome:
        </label>
        <p className="control has-icons-left has-icons-right">
          <input
            type="text"
            className={
              "input " +
              (name !== "placeholder" && name !== "" && " is-success ") +
              (name == "" && " is-danger ")
            }
            placeholder="Insira seu nome"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {name !== "placeholder" && name !== "" && (
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          )}
          {name == "" && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
          <span className="icon is-small is-left">
            <i className="fa-solid fa-user"></i>
          </span>
        </p>
        <p className="help has-text-weight-normal mb-3 is-italic">
          Sua senha será gerada automaticamente pelo nosso servidor e enviada
          para seu email de cadastro.
        </p>
      </div>

      <div className="card-footer">
        <button
          ref={submitButtonRef}
          className="card-footer-item button is-primary"
          onClick={handleSubmit}
        >
          {isRegister ? "Cadastrar" : "Criar usário"}
        </button>
      </div>
      <p className="is-italic help">
        Já tem conta? Faça login{" "}
        <Link passHref href="/users/login">
          <a className="is-underlined">clicando aqui!</a>
        </Link>
      </p>

      {successful === false && (
        <div
          className="notification is-danger is-light"
          onClick={() => setSuccessful(null)}
        >
          <button className="delete"></button>
          Ocorreu um erro no cadastro. <br />
          Motivo:{" "}
          <strong>
            {error ? error : "Sem rastreabilidade para este erro."}
          </strong>
        </div>
      )}
      {successful && (
        <div
          className="notification is-success is-light"
          onClick={() => setSuccessful(null)}
        >
          <button className="delete"></button>
          {isRegister
            ? "Seu cadastro foi realizado com sucesso! Verifique em seu email a senha que foi enviada para fazer login."
            : "O cadastro foi realizado com sucesso! A senha foi enviada para o email cadastrado e você já pode visualizar este usuário na lista de usuários."}
        </div>
      )}
    </Card>
  );
}

export { NewUserForm };
