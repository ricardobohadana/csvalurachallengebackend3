import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { getCookie, User } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

interface TransactionGroup {
  dataCadastro: Date;
  numDeTransacoes: number;
  user: {
    name: string;
    email: string;
    id: string;
  };
}

const TransactionPage = () => {
  const [successful, setSuccessful] = useState<null | boolean>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [groups, setGroups] = useState<TransactionGroup[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/transactions", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((resp) => {
        setGroups(resp.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) router.push("/users/login");
        console.log(err.response);
      });
  }, [router]);

  return (
    <Card title="Tabela de transações">
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
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th className="is-vcentered">Nome</th>
            <th className="is-vcentered">Data de Importação</th>
            <th className="is-vcentered" style={{ textAlign: "right" }}>
              Quantidade de Transações
            </th>
            <th colSpan={2} style={{ textAlign: "right" }}>
              <Link href="/transfers/create" passHref>
                <a className="button is-light is-secondary">Enviar CSV</a>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g, index) => {
            let datetime = new Date(g.dataCadastro);
            let datetimeStr =
              datetime.toLocaleDateString() +
              " " +
              datetime.toLocaleTimeString();
            return (
              <tr key={index}>
                <td className="is-vcentered">{g.user.name}</td>
                <td className="is-vcentered">{datetimeStr}</td>
                <td className="is-vcentered" style={{ textAlign: "right" }}>
                  {g.numDeTransacoes}
                </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  <Link
                    href={`/transfers/${g.user.id}/${g.dataCadastro}`}
                    passHref
                  >
                    <a className="button is-light is-warning">Detalhes</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export { TransactionPage };
