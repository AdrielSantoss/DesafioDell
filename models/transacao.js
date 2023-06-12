// DADOS EM MEMORIA

let _transacaoIdGenerator = 0;
class Transacao {
    id = 0;
    data = '';
    tipo = '';
    categoria = 0;
    descricao = 0;
    valor = 0

    constructor(_id, _descricao, _banco, _agencia, _numeroConta) {
        this.id = _transacaoIdGenerator++;
        this.data = _descricao;    
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