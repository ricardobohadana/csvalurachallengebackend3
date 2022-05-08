"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionController = void 0;
const xml2js_1 = __importDefault(require("xml2js"));
class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async handle(request, response) {
        try {
            if (!request.files)
                throw new Error("Não foi encontrado arquivo na requisição");
            const file = request.files.file;
            // console.log(file);
            if (!file.name.endsWith(".csv") && !file.name.endsWith(".xml"))
                throw new Error("Não aceitamos arquivos com esta extensão!");
            var listJson;
            const user = request.body.user;
            if (file.name.endsWith(".csv")) {
                const rawData = file.data.toString();
                const listData = rawData.split("\n");
                listJson = listData.map((str) => {
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
            }
            else if (file.name.endsWith(".xml")) {
                const parser = new xml2js_1.default.Parser({ attrkey: "ATTR" });
                parser.parseString(file.data.toString(), (err, result) => {
                    if (err) {
                        console.log(err);
                        throw new Error(err.message);
                    }
                    listJson = result.transacoes.transacao.map((t) => {
                        return {
                            userId: user.id,
                            bancoOrigem: t.origem[0].banco[0],
                            agenciaOrigem: t.origem[0].agencia[0],
                            contaOrigem: t.origem[0].conta[0],
                            bancoDestino: t.destino[0].banco[0],
                            agenciaDestino: t.destino[0].agencia[0],
                            contaDestino: t.destino[0].conta[0],
                            valorTransacao: t.valor[0],
                            dataTransacao: new Date(t.data[0]),
                        };
                    });
                });
            }
            console.log(listJson);
            throw new Error("Parando aqui!");
            await this.createTransactionUseCase.execute(listJson);
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado.",
            });
        }
    }
}
exports.CreateTransactionController = CreateTransactionController;
