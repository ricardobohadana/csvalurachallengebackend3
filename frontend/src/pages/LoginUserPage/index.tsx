import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";
import { useAuthenticationRestrictions } from "../../hooks/useAuthenticationRestrictions";

function LoginUserPage() {
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isEmailIncorrect, setIsEmailIncorrect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("placeholder");
  const loginButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const {
    isAuthenticated,
    // getAuthorizationCookie,
    setAuthorizationCookie,
    setUser,
  } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }
  });

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
    loginButtonRef.current?.classList.add("is-loading");
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        console.log(resp.status);
        console.log(resp.data);
        if (resp.status === 200) {
          setAuthorizationCookie(resp.data.accessToken, resp.data.user);
          loginButtonRef.current?.classList.remove("is-loading");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        loginButtonRef.current?.classList.remove("is-loading");
      });
  }

  return (
    <Card title="Autenticação de usuário">
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
          Senha:
        </label>
        <p className="control has-icons-left has-icons-right">
          <input
            type="password"
            className={
              "input " +
              (password !== "placeholder" &&
                password !== "" &&
                " is-success ") +
              (password == "" && " is-danger ")
            }
            placeholder="Insira seu nome"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {password !== "placeholder" && password !== "" && (
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          )}
          {password == "" && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
        <p className="help has-text-weight-normal mb-3 is-italic">
          Insira a senha enviada para seu email de cadastro.
        </p>
      </div>

      <div className="card-footer">
        <button
          className="card-footer-item button is-primary"
          onClick={handleSubmit}
          ref={loginButtonRef}
        >
          Iniciar sessão
        </button>
      </div>
      <p className="is-italic help">
        Não tem conta? Cadastre-se{" "}
        <Link passHref href="/users/register">
          <a className="is-underlined">clicando aqui!</a>
        </Link>
      </p>
    </Card>
  );
}

export { LoginUserPage };
