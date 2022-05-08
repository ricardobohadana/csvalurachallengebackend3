"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportTransactionsUseCase = void 0;
class ReportTransactionsUseCase {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
        this.transactionLimit = 100000;
        this.accountLimit = 1000000;
    }
    getSuspectAccounts(data) {
        const accounts = data.reduce((previousValue, currentValue) => {
            let valDestino = `${currentValue.bancoDestino} ${currentValue.agenciaDestino} ${currentValue.contaDestino}`;
            let valOrigem = `${currentValue.bancoOrigem} ${currentValue.agenciaOrigem} ${currentValue.contaOrigem}`;
            if (!previousValue.includes(valDestino)) {
                previousValue.push(valDestino);
            }
            if (!previousValue.includes(valOrigem)) {
                previousValue.push(valOrigem);
            }
            return previousValue;
        }, []);
        var accountsMovements = accounts.map((a) => 0);
        data.forEach((t) => {
            let valDestino = `${t.bancoDestino} ${t.agenciaDestino} ${t.contaDestino}`;
            let valOrigem = `${t.bancoOrigem} ${t.agenciaOrigem} ${t.contaOrigem}`;
            const index1 = accounts.indexOf(valDestino);
            const index2 = accounts.indexOf(valOrigem);
            const amount = t.valorTransacao;
            accountsMovements[index1] += Number(amount);
            accountsMovements[index2] += Number(amount);
        });
        return accountsMovements
            .map((m, index) => {
            let data = accounts[index].split(" ");
            if (m > this.accountLimit) {
                return {
                    banco: data[0],
                    agencia: data[1],
                    conta: data[2],
                    movement: m,
                };
            }
            else {
                return null;
            }
        })
            .filter((a) => a !== null);
    }
    getSuspectAgencies(data) {
        const agencies = data.reduce((previousValue, currentValue) => {
            let valDestino = `${currentValue.bancoDestino} ${currentValue.agenciaDestino}`;
            if (!previousValue.includes(valDestino)) {
                previousValue.push(valDestino);
            }
            let valOrigem = `${currentValue.bancoOrigem} ${currentValue.agenciaOrigem}`;
            if (!previousValue.includes(valOrigem)) {
                previousValue.push(valOrigem);
            }
            return previousValue;
        }, []);
        var agenciesMovements = agencies.map((a) => 0);
        data.forEach((t) => {
            let valDestino = `${t.bancoDestino} ${t.agenciaDestino}`;
            let valOrigem = `${t.bancoOrigem} ${t.agenciaOrigem}`;
            const index1 = agencies.indexOf(valDestino);
            const index2 = agencies.indexOf(valOrigem);
            const amount = t.valorTransacao;
            agenciesMovements[index1] += Number(amount);
            agenciesMovements[index2] += Number(amount);
        });
        return agenciesMovements
            .map((m, index) => {
            let data = agencies[index].split(" ");
            if (m > this.accountLimit) {
                return {
                    banco: data[0],
                    agencia: data[1],
                    movimentacao: m,
                };
            }
            else {
                return null;
            }
        })
            .filter((a) => a !== null);
    }
    async execute({ month, year }) {
        const data = await this.transactionRepository.getByMonthAndYear(month, year);
        if (data.length === 0)
            throw new Error("Não temos transações para o período especificado");
        // transações suspeitas:
        const suspectTransactions = data.filter((t) => Number(t.valorTransacao) >= this.transactionLimit);
        // contas suspeitas
        const suspectAccounts = this.getSuspectAccounts(data);
        // agencias suspeitas
        const suspectAgencies = this.getSuspectAgencies(data);
        return { suspectTransactions, suspectAccounts, suspectAgencies };
    }
}
exports.ReportTransactionsUseCase = ReportTransactionsUseCase;
