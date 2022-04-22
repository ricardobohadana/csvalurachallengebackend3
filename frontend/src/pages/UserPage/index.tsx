import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import {
  AuthenticationContext,
  User,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";
import { useAuthenticationRestrictions } from "../../hooks/useAuthenticationRestrictions";

export function UserPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const { getAuthorizationCookie, user } = useContext(AuthenticationContext);
  const router = useRouter();
  const shouldRedirect = useAuthenticationRestrictions();

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/users/login");
      return;
    }
    axiosInstance
      .get("/users", {
        headers: {
          Authorization: `Bearer ${getAuthorizationCookie()}`,
        },
      })
      .then((resp) => resp.data)
      .then((data) => data.users)
      .then((users: User[]) => {
        // not show yourself
        const validUsers = users.filter((u) => u.id !== user?.id);
        setUsers(validUsers);
      })
      .catch((err) => console.log(err.response));
  });

  return (
    <Card title="Tabela de usuários">
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
                  <Link href={`/users/edit/${u.id}`}>
                    <a className="button is-light is-warning">Editar</a>
                  </Link>
                </td>
                <td>
                  <button className="button is-light is-danger">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
