// BANCO DE DADOS EM MEMORIA

// GENERATORS DE PRIMARY KEYS
let _contaIdGenerator = 0;
let _transacaoIdGenerator = 0;

// TABELAS
class Conta {
    id = 0;
    descricao = '';
    banco = '';
    agencia = 0;
    numeroConta = 0;
    saldo = 0;
    transacoes = [];

    constructor(_descricao, _banco, _agencia, _numeroConta, _saldo = 0, _transacoes = []) {
        this.id = _contaIdGenerator++;
        this.descricao = _descricao;    
        this.banco = _banco;
        this.agencia = _agencia;
        this.numeroConta = _numeroConta;
        this.saldo = _saldo;
        this.transacoes = _transacoes;
    }
}

class Transacao {
    id = 0;
    descricao = 0;
    data = '';
    tipo = 0;
    categoria = '';
    valor = 0

    constructor(_descricao, _data, _tipo, _categoria, _valor) {
        this.id = _transacaoIdGenerator++;
        this.descricao = _descricao;
        this.data = _data;    
        this.tipo = _tipo;
        this.categoria = _categoria;
        this.valor = _valor;
    }
}

// DADOS PARA TESTE
let currentContas = [
    new Conta('TESTE1', 'contaTeste1', 123, 56567, 4000),
    new Conta('TESTE2', 'contaTeste2', 123, 123696, 3500),
    new Conta('TESTE3', 'contaTeste3', 123, 2354345, 1200, [
        new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'carro', 378.3),
        new Transacao('teste_transacao', new Date().toLocaleDateString(), 1, 'moto', 378.3),
        new Transacao('teste_transacao', new Date().toLocaleDateString(), 1, 'adaga linda', 378.3),
        new Transacao('teste_transacao', new Date().toLocaleDateString(), 1, 'seila', 378.3),
        new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'testecategoria', 378.3)
    ]),
];