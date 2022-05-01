import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Card } from "../../components/Card";
import {
  AuthenticationContext,
  getCookie,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

function ReportPage() {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/users/login");
    const accessToken = getCookie("accessToken");
  }, [isAuthenticated, router]);

  return (
    <Card title="Relatório de atividades suspeitas">
      <div className="control has-icons-left">
        <div className="select">
          <select>
            <option selected>Mês</option>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </div>
        <div className="icon is-small is-left">
          <i className="fas fa-globe"></i>
        </div>
      </div>
    </Card>
  );
}

export { ReportPage };
