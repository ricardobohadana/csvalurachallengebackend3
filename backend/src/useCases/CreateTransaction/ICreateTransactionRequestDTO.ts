export interface ICreateTransactionRequestDTO {
  readonly userId: string;
  bancoOrigem: string;
  agenciaOrigem: string;
  contaOrigem: string;
  bancoDestino: string;
  agenciaDestino: string;
  contaDestino: string;
  valorTransacao: string;
  dataTransacao: Date;
}
