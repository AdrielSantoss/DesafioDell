// SIMULANDO BANCO DE DADOS NO LOCALSTORAGE
class Conta {
    id = 0;
    descricao = '';
    banco = '';
    agencia = 0;
    numeroConta = 0;
    saldo = 0;
    transacoes = [];

    constructor(_descricao, _banco, _agencia, _numeroConta, _saldo = 0, _transacoes = []) {
        this.id = adicionarPrimaryKey('contaIdGenerator');
        this.descricao = _descricao;    
        this.banco = _banco;
        this.agencia = _agencia;
        this.numeroConta = _numeroConta;
        this.saldo = _saldo;
        this.transacoes = _transacoes;
    }

    get saldo() {
        return 123;
    }
}

class Transacao {
    id = 0;
    descricao = 0;
    data = '';
    tipo = 0; // 0 = receita, 1 = despesa, 
    categoria = '';
    valor = 0
    conta_id = 0 // foreign key

    constructor(_descricao, _data, _tipo, _categoria, _valor, _conta_id) {
        this.id = adicionarPrimaryKey('transacaoIdGenerator');
        this.descricao = _descricao;
        this.data = _data;    
        this.tipo = _tipo;
        this.categoria = _categoria;
        this.valor = _valor;
        this.conta_id =_conta_id;
    }
}

// CRUD (CREATE, READ, UPDATE, DELETE)
function consultarDados(tabela) {
    const dados = localStorage.getItem(tabela);
    if(dados !== null) {
        return JSON.parse(dados);
    }
}

function consultarDado(tabela, id) {
    const dados = localStorage.getItem(tabela);
    if(dados !== null) {
        const dadosParse = JSON.parse(dados);
        return dadosParse.find((dado) => dado.id == id);
    }
}

function adicionarDado(tabela, dado) {
    const dados = localStorage.getItem(tabela);
    if(dados !== null) {
        const dadosParse = JSON.parse(dados);
        dadosParse.push(dado);
        localStorage.setItem(tabela, JSON.stringify(dadosParse));
    }
}

function atualizarDado(tabela, id, dado) {
    const dados = localStorage.getItem(tabela);
    if(dados !== null) {
        const dadosParse = JSON.parse(dados);
        const idx = dadosParse.findIndex((dado) => dado.id == id);

        if(idx !== -1) {
            dadosParse[idx] = Object.assign(dadosParse[idx], dado);
        }

        localStorage.setItem(tabela, JSON.stringify(dadosParse));
    }
}

function removerDado(tabela, id) {
    const dados = localStorage.getItem(tabela);
    if(dados !== null) {
        const dadosParse = JSON.parse(dados);
        const idx = dadosParse.findIndex((dado) => dado.id == id);
        
        if(idx !== -1) {
            dadosParse.splice(idx, 1);
            localStorage.setItem(tabela, JSON.stringify(dadosParse));
        }
    }
}

function adicionarPrimaryKey(id) {
    // GENERATOR DE PRIMARY KEYS
    const idGenerator = localStorage.getItem(id);

    if(idGenerator !== null){
        const newId = Number(idGenerator) + 1;
        localStorage.setItem(id, newId);

        return newId;
    } 
    
    localStorage.setItem(id, 1);
    return 1;
}

// DADOS PARA TESTE
function adicionaDadosParaTeste() {
    const contas = localStorage.getItem('contas');
    if(!contas)  {
        localStorage.setItem('contas', JSON.stringify([
            new Conta('TESTE1', 'contaTeste1', 123, 56567, 300),
            new Conta('TESTE2', 'contaTeste2', 123, 123696, 400),
            new Conta('TESTE3', 'contaTeste3', 123, 2354345, 800),
        ]));

        localStorage.setItem('transacoes', JSON.stringify([
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'carro', 200, 1),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'carro', 300, 1),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 1, 'carro', 200, 1),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'carro', 200, 2),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'carro', 200, 2),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 1, 'carro', 500, 3),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 1, 'carro', 500, 3),
            new Transacao('teste_transacao', new Date().toLocaleDateString(), 0, 'carro', 1800, 3)
        ]));
    }
}

adicionaDadosParaTeste();



