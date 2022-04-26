import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { getCookie } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

interface Props {
  userId: string;
  dataCadastro: string;
}

interface Transfer {
  id: string;
  userId: string;
  bancoOrigem: string;
  agenciaOrigem: string;
  contaOrigem: string;
  bancoDestino: string;
  agenciaDestino: string;
  contaDestino: string;
  valorTransacao: string;
  dataTransacao: Date;
  dataCadastro: Date | null;
}

function TransactionDetailPage({ userId, dataCadastro }: Props) {
  const router = useRouter();
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    if (!userId || !dataCadastro) {
      return;
    }
    console.log(userId);
    console.log(dataCadastro);
    axiosInstance
      .get("/transactions/details", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        params: {
          userId,
          dataCadastro,
        },
      })
      .then((resp) => {
        console.log(resp.status);
        console.log(resp.data);
        setTransfers(resp.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) return router.push("/users/login");
        console.log(err.response);
        console.log(err.response.data);
      });
  }, [dataCadastro, userId, router]);

  return (
    <Card title="Transações detalhadas">
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th className="is-vcentered">Data da Transação</th>
            <th className="is-vcentered">Banco de Origem</th>
            <th className="is-vcentered">Agencia de Origem</th>
            <th className="is-vcentered">Conta de Origem</th>
            <th className="is-vcentered">Banco de Destino</th>
            <th className="is-vcentered">Agencia de Destino</th>
            <th className="is-vcentered">Conta de Destino</th>
            <th className="is-vcentered" style={{ textAlign: "right" }}>
              Valor da Transação
            </th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t, index) => {
            const dataTransacao = new Date(t.dataTransacao);
            return (
              <tr key={index}>
                <td className="is-vcentered">
                  {dataTransacao.toLocaleString()}
                </td>
                <td className="is-vcentered">{t.bancoOrigem}</td>
                <td className="is-vcentered">{t.agenciaOrigem}</td>
                <td className="is-vcentered">{t.contaOrigem}</td>
                <td className="is-vcentered">{t.bancoDestino}</td>
                <td className="is-vcentered">{t.agenciaDestino}</td>
                <td className="is-vcentered">{t.contaDestino}</td>
                <td className="is-vcentered" style={{ textAlign: "right" }}>
                  {money.format(Number(t.valorTransacao))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export { TransactionDetailPage };
