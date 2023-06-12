// DADOS EM MEMORIA

let _contaIdGenerator = 0;
class Conta {
    id = 0;
    descricao = '';
    banco = '';
    agencia = 0;
    numeroConta = 0;
    saldo = 0;
    transacoes = []; // fazer vinculo com transacao futuramente

    constructor(_id, _descricao, _banco, _agencia, _numeroConta) {
        this.id = _contaIdGenerator++;
        this.descricao = _descricao;    
        this.banco = _banco;
        this.agencia = _agencia;
        this.numeroConta = _numeroConta;
    }
}

let currentContas = [
    new Conta('TESTE1', 'contaTeste1', 123, 123232345),
    new Conta('TESTE2', 'contaTeste2', 123, 123232345),
    new Conta('TESTE3', 'contaTeste3', 123, 123232345),
];
