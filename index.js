// DADOS
class Conta {
    id = 0;
    descricao = '';
    banco = '';
    agencia = 0;
    numeroConta = 0;
    saldo = 0

    constructor(_id, _descricao, _banco, _agencia, _numeroConta) {
        // incrementar id automaticamente (nao inserir na instancia)
        this.id = _id;
        this.descricao = _descricao;    
        this.banco = _banco;
        this.agencia = _agencia;
        this.numeroConta = _numeroConta;
    }
}

let currentContas = [
    new Conta(1, 'teste1', 'bancoTeste1', 123, 123232345),
    new Conta(2, 'teste2', 'bancoTeste2', 123, 123232345),
    new Conta(3, 'teste3', 'bancoTeste3', 123, 123232345),
];

// UTILS FUNCTIONS
window.onload = () => {
    lerTodasContas();
}

function pegaValoresInput(input) {
    const elemento = document.querySelector(input);

    if(elemento) {
        return elemento.value;
    }

    return null;
}

function setaValoresInput(input, value) {
    const elemento = document.querySelector(input);
    elemento.value = value
}

function showElemento(selector) {
    const elemento = document.querySelector(selector);
    elemento.style.display = 'block';
}

function hideElemento(selector) {
    const elemento = document.querySelector(selector);
    elemento.style.display = 'none';
}

function addConteudoHTML(selector, conteudo, concatenar) {
    const elemento = document.querySelector(selector);

    if(concatenar) {
        elemento.innerHTML += conteudo;
    } else {
        elemento.innerHTML = conteudo;
    }
}

function fechaModal() {
    const elemento = document.querySelector('#closeModalBtn');
    elemento.click();
}

// CRIAR CONTA FUNCTIONS
function validacaoValoresCriacaoConta(valoresInfos) {
    return new Promise((resolve, reject) => {
        let contemInvalidos = false;
        const errorElement = '#criarContaErrors';
        addConteudoHTML(errorElement, '', false);
    
        for (const index in valoresInfos) {
            const currentValor = valoresInfos[index];
    
            if(!currentValor.valor) {
                showElemento(errorElement);
                addConteudoHTML(errorElement, `<li>${currentValor.mensagem}</li>`, true);
                contemInvalidos = true;
            }
        }
    
        if(!contemInvalidos) {
            // não possui erros, pode presseguir com a criação de conta
            hideElemento(errorElement);
            resolve();
        } else {
            // possui erros, não pode prosseguir com a criação da conta
            reject();
        }
    })
}

function limpaValores() {
    setaValoresInput('#descricao', null);
    setaValoresInput('#nomeBanco', null);
    setaValoresInput('#agencia', null);
    setaValoresInput('#numeroConta', null);
}

// CRUD (CREATE, READ, UPDATE, DELETE)
function lerTodasContas() {
    addConteudoHTML('#tableBody', '', false);

    for (const index in currentContas) {
        const currentConta = currentContas[index];
        
        addConteudoHTML(
            '#tableBody', 
            `<tr>
                <th scope="row">${currentConta.id}</th>
                <td>${currentConta.banco}</td>
                <td>${currentConta.descricao}</td>
                <td>${0}</td>
                <td>${currentConta.saldo}</td>
                <td>
                <button type="button" class="btn btn-danger" onclick="excluirConta('${currentConta.id}')">
                    Excluir
                </button>
                </td>
            </tr>`, 
            true
        );
    }
}

function excluirConta(id) {    
    console.log(id)
    const index = currentContas.findIndex((item) => item.id == id);
    console.log(index)

    if(index !== -1) {
        currentContas.splice(index, 1);
    }

    lerTodasContas();
}

function criarConta() {
    const descricao = pegaValoresInput('#descricao');
    const nomeBanco = pegaValoresInput('#nomeBanco');
    const agencia = pegaValoresInput('#agencia');
    const numeroConta = pegaValoresInput('#numeroConta');

    validacaoValoresCriacaoConta([
        {valor: descricao, mensagem: 'Informe a Descrição da conta.'},
        {valor: nomeBanco, mensagem: 'Informe o Nome do banco.'},
        {valor: agencia, mensagem: 'Informe a Agência.'},
        {valor: numeroConta, mensagem: 'Informe o Número da conta.'}
    ]).then(() => {
            // Adicionando nova conta que foi validada
            currentContas.push(new Conta(currentContas.length, descricao, nomeBanco, agencia, numeroConta));
            
            addConteudoHTML(
                '#tableBody', 
                `<tr>
                    <th scope="row">${currentContas.length}</th>
                    <td>${nomeBanco}</td>
                    <td>${descricao}</td>
                    <td>${agencia}</td>
                    <td>${0}</td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="excluirConta('${currentContas.length}')">
                        Excluir
                    </button>
                    </td>
                </tr>`,
                true
            );
            limpaValores();
            fechaModal();
        }
    ).catch((err) => console.error('Ocorreu um erro ao criar a conta', err));
}



 