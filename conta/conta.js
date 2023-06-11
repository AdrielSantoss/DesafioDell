// DADOS EM MEMORIA
let currentContas = [
    new Conta('teste1', 'bancoTeste1', 123, 123232345),
    new Conta('teste2', 'bancoTeste2', 123, 123232345),
    new Conta('teste3', 'bancoTeste3', 123, 123232345),
];

window.onload = () => {
    lerTodasContas();
}

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
    const index = currentContas.findIndex((item) => item.id == id);

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
            const novaConta = new Conta(descricao, nomeBanco, agencia, numeroConta);
            currentContas.push(novaConta);
            
            addConteudoHTML(
                '#tableBody', 
                `<tr>
                    <th scope="row">${novaConta.id}</th>
                    <td>${novaConta.banco}</td>
                    <td>${novaConta.descricao}</td>
                    <td>${novaConta.agencia}</td>
                    <td>${novaConta.saldo}</td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="excluirConta('${novaConta.id}')">
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



 