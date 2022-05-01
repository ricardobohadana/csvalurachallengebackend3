import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import {
  AuthenticationContext,
  deleteCookie,
  getCookie,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";
import axios, { AxiosError } from "axios";
import { Transfer } from "../TransactionDetailPage";

export interface SuspectAgency {
  banco: string;
  agencia: string;
  movimentacao: number;
}

export interface SuspectAccount {
  banco: string;
  agencia: string;
  conta: string;
  movimentacao: number;
}

function ReportPage() {
  const { setIsAuthenticated, setUser } = useContext(AuthenticationContext);
  const [noData, setNoData] = useState(false);
  const [noDataAcc, setNoDataAcc] = useState(false);
  const [noDataT, setNoDataT] = useState(false);
  const [noDataAg, setNoDataAg] = useState(false);
  const [month, setMonth] = useState(-1);
  const [year, setYear] = useState(2022);
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const [suspectTransactions, setSuspectTransactions] = useState<Transfer[]>(
    []
  );
  const [suspectAccounts, setSuspectAccounts] = useState<SuspectAccount[]>([]);
  const [suspectAgencies, setSuspectAgencies] = useState<SuspectAgency[]>([]);
  const router = useRouter();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    axiosInstance
      .get("/checkAuth", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setIsAuthenticated(true);
          setUser(resp.data.user);
        }
        throw resp;
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
          deleteCookie("accessToken");
          router.push("/users/login");
        }
      });
  }, [setIsAuthenticated, setUser, router]);

  function handleSubmit() {
    axiosInstance
      .get("/transactions/report", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        params: {
          month,
          year,
        },
      })
      .then((resp) => {
        // console.log(resp.data);
        setSuspectAccounts(resp.data.suspectAccounts);
        setSuspectAgencies(resp.data.suspectAgencies);
        setSuspectTransactions(resp.data.suspectTransactions);
        setNoDataAcc(resp.data.suspectAccounts.length > 0);
        setNoDataT(resp.data.suspectTransactions.length > 0);
        setNoDataAg(resp.data.suspectAgencies.length > 0);
      })
      .catch((err: AxiosError) => {
        setSuspectAccounts([]);
        setSuspectAgencies([]);
        setSuspectTransactions([]);
        setNoData(true);
        // console.log(err.response?.data);
        // console.log(err.response?.status);
        if (err.response?.status === 401) {
          deleteCookie("accessToken");
          router.push("/users/login");
        }
      });
  }

  function renderNotification(
    entity: string,
    setController: React.Dispatch<React.SetStateAction<boolean>>,
    controller: boolean
  ) {
    return (
      <div
        className="notification is-warning is-light"
        onClick={() => setController(!controller)}
      >
        <button className="delete"></button>
        Não foram encontradas {entity} suspeitas no período informado
      </div>
    );
  }

  return (
    <>
      <div className="mb-5">
        <Card title="Relatório de atividades suspeitas">
          <div className="field is-grouped">
            <div className="control has-icons-left">
              <div className="select">
                <select
                  defaultValue={-1}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  <option disabled value={-1}>
                    Mês
                  </option>
                  {months.map((val, index) => {
                    return (
                      <option key={index} value={index}>
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-calendar"></i>
              </div>
            </div>
            <p className="control">
              <input
                type="number"
                step={1}
                className="input"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </p>
            <button
              className="button is-light is-secondary"
              onClick={handleSubmit}
            >
              Procurar
            </button>
          </div>
        </Card>
      </div>
      {suspectTransactions.length !== 0 ? (
        <div className="mb-5">
          <Card title={`Transações suspeitas de ${months[month]} de ${year}`}>
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
                {suspectTransactions.map((t, index) => {
                  const dataTransacao = new Date(t.dataTransacao);
                  return (
                    <tr key={index}>
                      <td className="is-vcentered">{t.bancoOrigem}</td>
                      <td className="is-vcentered">{t.agenciaOrigem}</td>
                      <td className="is-vcentered">{t.contaOrigem}</td>
                      <td className="is-vcentered">{t.bancoDestino}</td>
                      <td className="is-vcentered">{t.agenciaDestino}</td>
                      <td className="is-vcentered">{t.contaDestino}</td>
                      <td
                        className="is-vcentered"
                        style={{ textAlign: "right" }}
                      >
                        {money.format(Number(t.valorTransacao))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        renderNotification("transações", setNoDataT, noDataT)
      )}
      {suspectAccounts.length !== 0 ? (
        <div className="mb-5">
          <Card title={`Contas suspeitas de ${months[month]} de ${year}`}>
            <table className="table is-hoverable is-fullwidth is-bordered is-striped">
              <thead>
                <tr>
                  <th className="is-vcentered">BANCO</th>
                  <th className="is-vcentered">Agência</th>
                  <th className="is-vcentered">Conta</th>
                  <th className="is-vcentered has-text-right">Movimentação</th>
                </tr>
              </thead>
              <tbody>
                {suspectAccounts.map((a, index) => {
                  return (
                    <tr key={index}>
                      <td>{a.banco}</td>
                      <td>{a.agencia}</td>
                      <td>{a.conta}</td>
                      <td>{money.format(a.movimentacao)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        renderNotification("contas", setNoDataAcc, noDataAcc)
      )}
      {suspectAgencies.length !== 0 ? (
        <div className="mb-5">
          <Card title={`Agências suspeitas de ${months[month]} de ${year}`}>
            <table className="table is-hoverable is-fullwidth is-bordered is-striped">
              <thead>
                <tr>
                  <th className="is-vcentered">BANCO</th>
                  <th className="is-vcentered">Agência</th>
                  <th className="is-vcentered has-text-right">Movimentação</th>
                </tr>
              </thead>
              <tbody>
                {suspectAgencies.map((a, index) => {
                  return (
                    <tr key={index}>
                      <td>{a.banco}</td>
                      <td>{a.agencia}</td>
                      <td>{money.format(a.movimentacao)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        renderNotification("agências", setNoDataAg, noDataAg)
      )}
    </>
  );
}

export { ReportPage };
