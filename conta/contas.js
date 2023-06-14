window.onload = () => {
    lerTodasContas();
}

function limparValores() {
    setaValoresInput('#descricao', null);
    setaValoresInput('#nomeBanco', null);
    setaValoresInput('#agencia', null);
    setaValoresInput('#numeroConta', null);
}

function lerTodasContas() {
    addConteudoHTML('#tableBody', '', false);
    const contas = consultarDados('contas');

    if(contas !== null){
        for (const currentConta of contas) {
            const transacoes = consultarDados('transacoes');
            const currentTransacoes = transacoes.filter((transacao) => transacao.conta_id === currentConta.id);
            
            addConteudoHTML(
                '#tableBody', 
                `<tr>
                    <td>${currentConta.banco}</td>
                    <td>${currentConta.descricao}</td>
                    <td>${currentConta.numeroConta}</td>
                    <td>${currentConta.agencia}</td>
                    <td>${currentTransacoes.length}</td>
                    <td>${formataValorReal(Number(currentConta.saldo))}</td>
                    <td>
                    <button type="button" class="btn btn-primary" onclick="abrirTransacoes('${currentConta.id}')">
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
}

function abrirTransacoes(id) {
    window.location.href = window.location.href.replace('/conta/contas.html', `/transacao/transacoes.html?id=${id}`)
}

function excluirConta(id) {    
    const transacoes = consultarDados('transacoes');
    const currentContaTransacoes = transacoes.filter((transacao) => transacao.conta_id == id);

    for (const transacao of currentContaTransacoes) {
        removerDado('transacoes', transacao.id);
    }

    removerDado('contas', id);
    lerTodasContas();
}

function criarConta() {
    const descricao = pegaValoresInput('#descricao');
    const nomeBanco = pegaValoresInput('#nomeBanco');
    const agencia = pegaValoresInput('#agencia');
    const numeroConta = pegaValoresInput('#numeroConta');

    validacaoValoresInput('#criarContaErrors', [
        {valor: descricao, mensagem: 'Informe a Descrição da conta.'},
        {valor: nomeBanco, mensagem: 'Informe o Nome do banco.'},
        {valor: agencia, mensagem: 'Informe a Agência.'},
        {valor: numeroConta, mensagem: 'Informe o Número da conta.'}
    ]).then(() => {
            // Adicionando nova conta que foi validada
            const novaConta = new Conta(descricao, nomeBanco, agencia, numeroConta);
            adicionarDado('contas', novaConta);
            addConteudoHTML(
                '#tableBody', 
                `<tr>
                    <td>${novaConta.banco}</td>
                    <td>${novaConta.descricao}</td>
                    <td>${novaConta.numeroConta}</td>
                    <td>${novaConta.agencia}</td>
                    <td>${0}</td>
                    <td>${formataValorReal(Number(novaConta.saldo))}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="abrirTransacoes('${novaConta.id}')">
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
            limparValores();
            fecharModal('#closeModalBtn');
        }
    ).catch((err) => console.error('Ocorreu um erro ao criar a conta', err));
}

function abrirGeral() {
    window.location.href = window.location.href.replace('/conta/contas.html', '/index.html');
}