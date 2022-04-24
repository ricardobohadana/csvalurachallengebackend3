import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import {
  AuthenticationContext,
  getCookie,
  User,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";
import { useAuthenticationRestrictions } from "../../hooks/useAuthenticationRestrictions";

export function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useContext(AuthenticationContext);
  const [successful, setSuccessful] = useState<null | boolean>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const shouldRedirect = useAuthenticationRestrictions();

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const userId = target.id;
    target.classList.add("is-loading");
    setSuccessful(null);
    axiosInstance
      .delete(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((resp) => {
        console.log(resp.status);
        if (target) {
          target.classList.remove("is-loading");
        }
        if (resp.status === 202) {
          setSuccessful(true);
          notificationRef.current?.classList.add("is-success");
          setUsers((previousState) =>
            previousState.filter((user) => user.id !== userId)
          );
        }
      })
      .catch((err) => {
        target.classList.remove("is-loading");
        setSuccessful(false);
        notificationRef.current?.classList.add("is-danger");
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/users", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((resp) => resp.data)
      .then((data) => data.users)
      .then((users: User[]) => {
        // not show yourself
        const validUsers = users.filter((u) => u.id !== user?.id);
        setUsers(validUsers);
      })
      .catch((err) => {
        console.log(err.response);
        router.push("/users/login");
      });
  }, [router, user?.id]);

  return (
    <Card title="Tabela de usuários">
      {successful !== null && (
        <div
          ref={notificationRef}
          className="notification is-light mb-2"
          onClick={() => {
            setSuccessful(null);
            notificationRef.current?.classList.remove("is-success");
            notificationRef.current?.classList.remove("is-danger");
          }}
        >
          <button className="delete"></button>
          {successful === true && "Usuário excluído com sucesso."}
          {successful === false &&
            "Ocorreu um erro, tente novamente mais tarde."}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Id do Usuário</th>
            <th>Nome</th>
            <th>Email</th>
            <th colSpan={2}>
              <Link href="/users/create" passHref>
                <a className="button is-light is-secondary">Novo Usuário</a>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u, key) => {
            return (
              <tr key={key}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <Link href={`/users/${u.id}`}>
                    <a className="button is-light is-warning">Editar</a>
                  </Link>
                </td>
                <td>
                  <button
                    id={u.id}
                    className="button is-light is-danger"
                    onClick={handleDeleteUser}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
