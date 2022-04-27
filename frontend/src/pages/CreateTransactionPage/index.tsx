import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import {
  AuthenticationContext,
  getCookie,
} from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";
import { useAuthenticationRestrictions } from "../../hooks/useAuthenticationRestrictions";

function CreateTransactionPage() {
  const noFileMessage =
    "Envie um arquivo com extensão csv para cadastrar transações";

  const [sendFileState, setSendFileState] = useState("Envie seu arquivo");
  const [filePath, setFilePath] = useState(noFileMessage);
  const [file, setFile] = useState<File | null>();
  const [showError, setShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    // checkAuthentication,
  } = useContext(AuthenticationContext);

  // checar se o usuário está autenticado!
  const shouldRedirect = useAuthenticationRestrictions();

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/users/login");
    }
  });

  function handleFileAttachment(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    console.log(files);
    if (!files || !files[0].name.endsWith(".csv") || !files[0]) {
      setShowError(true);
      return;
    }
    setFilePath(files[0].name);
    setSendFileState("Arquivo carregado!");
    setFile(files[0]);
    setIsSuccess(true);
  }

  function handleFileSend(e: React.MouseEvent<HTMLButtonElement>) {
    const form = new FormData();
    form.append("file", file!);

    axiosInstance
      .post("/transactions", form, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
          ContentType: "multipart/form-data",
        },
      })
      .then((resp) => {
        resp.status === 201 && setSuccessful(true);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message);
        setSuccessful(false);
      });
  }

  return (
    <Card title="Envio de arquivo de transação">
      {successful === false && (
        <div
          className="notification is-warning"
          onClick={() => setSuccessful(null)}
        >
          <button className="delete"></button>
          Ocorreu um erro e as transações enviadas não foram salvas.
          <br />
          {"Motivo: "}
          <strong>{error ? error : "Tente novamente mais tarde"}</strong>
        </div>
      )}
      {successful && (
        <div
          className="notification is-success"
          onClick={() => setSuccessful(!successful)}
        >
          <button className="delete"></button>
          Seu cadastro foi realizado com sucesso! Verifique em seu email a senha
          que foi enviada para fazer login.
        </div>
      )}
      <div
        className={
          "file has-name is-fullwidth mb-2 " +
          (showError && " is-danger") +
          (isSuccess && " is-success")
        }
      >
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="resume"
            onChange={handleFileAttachment}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              {showError ? "Tente novamente" : sendFileState}
            </span>
          </span>
          <span className="file-name is-italic">
            {showError ? "Selecione outro arquivo" : filePath}
          </span>
        </label>
      </div>
      {showError && (
        <p className="help is-danger is-italic">
          Arquivo não carregado corretamente, vazio ou sem a extensão correta
          (.csv)
        </p>
      )}
      {isSuccess && (
        <button
          className="button is-primary is-fullwidth"
          onClick={handleFileSend}
        >
          Enviar
        </button>
      )}
    </Card>
  );
}

export { CreateTransactionPage };
