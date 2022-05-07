interface IInnerSpecs {
  banco: [string];
  agencia: [string];
  conta: [string];
}

interface IInnerTransaction {
  origem: [IInnerSpecs];
  destino: [IInnerSpecs];
  valor: [number];
  data: [string];
}
interface ITransactionXmlJsonObject {
  transacoes: {
    transacao: IInnerTransaction[];
  };
}

export { ITransactionXmlJsonObject };
