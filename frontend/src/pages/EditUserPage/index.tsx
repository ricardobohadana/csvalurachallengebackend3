import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import {
  AuthenticationContext,
  getCookie,
  User,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";
import { useAuthenticationRestrictions } from "../../hooks/useAuthenticationRestrictions";

type Props = {
  userId?: string | string[];
};

function EditUserPage({ userId }: Props) {
  const [editUser, setEditUser] = useState<{
    email: string;
    name: string;
  }>({ email: "", name: "" });
  const [successful, setSuccessful] = useState<null | boolean>(null);
  const { user } = useContext(AuthenticationContext);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser({ ...editUser, name: e.target.value });
    if (e.target.value.length > 0) {
      nameInputRef.current?.classList.remove("is-danger");
      nameInputRef.current?.classList.add("is-success");
    } else {
      nameInputRef.current?.classList.add("is-danger");
      nameInputRef.current?.classList.remove("is-success");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser({ ...editUser, email: e.target.value });
    if (e.target.value.length > 0) {
      emailInputRef.current?.classList.remove("is-danger");
      emailInputRef.current?.classList.add("is-success");
    } else {
      emailInputRef.current?.classList.add("is-danger");
      emailInputRef.current?.classList.remove("is-success");
    }
  };

  const submitChanges = () => {
    submitButtonRef.current?.classList.add("is-loading");
    setSuccessful(null);
    axiosInstance
      .put(
        `/user/${userId}`,
        {
          ...editUser,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      )
      .then((resp) => {
        if (resp.status === 202) {
          setSuccessful(true);
          notificationRef.current?.classList.add("is-success");
        }
        submitButtonRef.current?.classList.remove("is-loading");
      })
      .catch((err) => {
        console.log(err.response.data);
        setSuccessful(false);
        notificationRef.current?.classList.add("is-danger");
        submitButtonRef.current?.classList.remove("is-loading");
      });
  };

  useEffect(() => {
    if (!userId) return;
    if (userId === "9a0d0a7f-695b-4231-81cb-d30f3b65ad05")
      router.push("/users");
    axiosInstance
      .get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((resp) => {
        resp.status === 200 && setEditUser(resp.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        router.push("/users/login");
      });
  }, [userId, router]);

  return (
    <Card title="Edição de usuário">
      <div className="field">
        <label htmlFor="" className="label">
          Email:
        </label>
        <p className="control has-icons-left has-icons-right">
          <input
            ref={emailInputRef}
            type="email"
            className="input"
            value={editUser?.email}
            onChange={handleEmailChange}
          />
          {editUser?.email?.includes("@") && editUser?.email?.includes(".") ? (
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          ) : (
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
            ref={nameInputRef}
            type="text"
            className="input"
            value={editUser?.name}
            onChange={handleNameChange}
          />
          {editUser?.name && editUser?.name.length > 0 ? (
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          ) : (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div className="card-footer">
        <button
          ref={submitButtonRef}
          className="card-footer-item button is-primary"
          onClick={submitChanges}
        >
          Salvar alterações
        </button>
      </div>
      {successful !== null && (
        <div
          ref={notificationRef}
          className="notification is-light mt-3"
          onClick={() => {
            setSuccessful(null);
            notificationRef.current?.classList.remove("is-success");
            notificationRef.current?.classList.remove("is-danger");
          }}
        >
          <button className="delete"></button>
          {successful === true && "As alterações foram salvas com sucesso."}
          {successful === false &&
            "Ocorreu um erro, verifique os campos ou tente novamente mais tarde."}
        </div>
      )}
    </Card>
  );
}

export { EditUserPage };
