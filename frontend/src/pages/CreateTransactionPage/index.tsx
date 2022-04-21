import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

function CreateTransactionPage() {
  const noFileMessage =
    "Envie um arquivo com extensão csv para cadastrar transações";

  const [sendFileState, setSendFileState] = useState("Envie seu arquivo");
  const [filePath, setFilePath] = useState(noFileMessage);
  const [file, setFile] = useState<File | null>();
  const [showError, setShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    checkAuthentication,
    getAuthorizationCookie,
    setAuthorizationCookie,
  } = useContext(AuthenticationContext);

  useEffect(() => {
    setAuthorizationCookie(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNmZkNTBiLTc3MjYtNDNiOS1iNmJjLWU1NmFkOTIxMGVlNyIsIm5hbWUiOiJSaWNhcmRvIiwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0OTE4NDIsImV4cCI6MTY1MDQ5MjQ0Mn0.pveuJc1h52n8-c1GDm_V5tP3mDmYoLs-MDJOUwiK7ek"
    );
    checkAuthentication()
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }, []);

  function handleFileAttachment(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files[0].type !== "text/csv" || !files[0]) {
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
          Authorization: `Bearer ${getAuthorizationCookie()}`,
          ContentType: "multipart/form-data",
        },
      })
      .then((resp) => console.log(resp.status))
      .catch((err) => console.log(err));
  }

  return (
    <Card title="Envio de arquivo de transação">
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
          ('.csv')
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
