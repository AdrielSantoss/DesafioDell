let _contaIdGenerator = 0;
class Conta {
    id = 0;
    descricao = '';
    banco = '';
    agencia = 0;
    numeroConta = 0;
    saldo = 0

    constructor(_id, _descricao, _banco, _agencia, _numeroConta) {
        this.id = _contaIdGenerator++;
        this.descricao = _descricao;    
        this.banco = _banco;
        this.agencia = _agencia;
        this.numeroConta = _numeroConta;
    }
}
