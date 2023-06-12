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
            // se não possui erros, pode presseguir com a criação de conta
            hideElemento(errorElement);
            resolve();
        } else {
            // se possui erros, não pode prosseguir com a criação da conta
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
                <button type="button" class="btn btn-primary" onclick="abrirConta('${currentConta.id}')">
                    Infos
                </button>
                <button type="button" class="btn btn-warning" onclick="excluirConta('${currentConta.id}')">
                    Mesclar
                </button>
                <button type="button" class="btn btn-danger" onclick="excluirConta('${currentConta.id}')">
                    Excluir
                </button> 
                </td>
            </tr>`, 
            true
        );
    }
}

function abrirConta(id) {
    window.location.href = `http://${window.location.host}/transacao/transacoes.html?id=${id}`;

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
            // arruamr infos aqui
            addConteudoHTML(
                '#tableBody', 
                `<tr>
                    <th scope="row">${novaConta.id}</th>
                    <td>${novaConta.banco}</td>
                    <td>${novaConta.descricao}</td>
                    <td>${novaConta.agencia}</td>
                    <td>${novaConta.saldo}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="abrirConta('${novaConta.id}')">
                            Infos
                        </button>
                        <button type="button" class="btn btn-warning" onclick="excluirConta('${novaConta.id}')">
                            Mesclar
                        </button>
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



 