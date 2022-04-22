import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";
import { parseStream } from "@fast-csv/parse";
import { createReadStream, readFileSync } from "fs";
import { v4 } from "uuid";
import { EncodedUser } from "../AuthorizeUser/AuthorizeUserUseCase";

export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      if (!request.files)
        throw new Error("Não foi encontrado arquivo na requisição");

      const file = request.files.file as UploadedFile;
      // console.log(file);

      if (!file.name.endsWith(".csv"))
        throw new Error("Não aceitamos arquivos com esta extensão!");

      const user = request.body.user as EncodedUser;

      const rawData = file.data.toString();
      const listData = rawData.split("\n");
      const listJson = listData.map((str) => {
        let data = str.split(",");
        return {
          userId: user.id,
          bancoOrigem: data[0],
          agenciaOrigem: data[1],
          contaOrigem: data[2],
          bancoDestino: data[3],
          agenciaDestino: data[4],
          contaDestino: data[5],
          valorTransacao: data[6],
          dataTransacao: new Date(data[7]),
        };
      });
      await this.createTransactionUseCase.execute(listJson);

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Erro inesperado.",
      });
    }
  }
}
