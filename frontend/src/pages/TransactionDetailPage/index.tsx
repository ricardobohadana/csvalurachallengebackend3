import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { getCookie } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

interface Props {
  dataTransacao: string;
}

export interface Transfer {
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

function TransactionDetailPage({ dataTransacao }: Props) {
  const router = useRouter();
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    if (!dataTransacao) {
      return;
    }

    axiosInstance
      .get("/transactions/details", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        params: {
          dataTransacao,
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
  }, [dataTransacao, router]);

  return (
    <Card
      title={`Transações detalhadas do dia ${new Date(
        dataTransacao
      ).toLocaleDateString()}`}
    >
      <table className="table is-hoverable is-fullwidth is-bordered is-striped">
        <thead>
          <tr>
            <th colSpan={3} className="has-text-centered">
              ORIGEM
            </th>
            <th colSpan={3} className="has-text-centered">
              DESTINO
            </th>
            <th className="has-text-right">VALOR</th>
          </tr>
          <tr>
            <th className="is-vcentered">Banco</th>
            <th className="is-vcentered">Agencia</th>
            <th className="is-vcentered">Conta</th>
            <th className="is-vcentered">Banco</th>
            <th className="is-vcentered">Agencia</th>
            <th className="is-vcentered">Conta</th>
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
