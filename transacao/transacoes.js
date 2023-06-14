let currentConta; // conta selecionada
let currentTransacoes; // transações da conta selecionada
let currentContas; // todas as contas

let tipoOperacao = 0; // 0 = criar, 1 = editar
let currentTransacaoId = 0; // identificação da transação a ser editada

window.onload = () => {
    carregarConta();
}

function carregarConta() {
    const queryParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

    if(queryParams?.id) {
        currentConta = consultarDado('contas', queryParams?.id);
        currentContas = consultarDados('contas');
        addConteudoHTML('#descricaoConta', currentConta.descricao, false);
        addConteudoHTML('#saldoConta', formataValorReal(currentConta.saldo), false);
        lerTodasTransacoes();
    }
}

function transacaoTipoDescricao(codTipo) {
    return Number(codTipo) === 1 ? 'Despesa' : 'Receita';
}

function lerTodasTransacoes() {
    addConteudoHTML('#tableBody', '', false);
    currentTransacoes = lertTransacoesCurrentConta();

    for (const currentTransacao of currentTransacoes) {        
        addConteudoHTML(
            '#tableBody', 
            `<tr id="i${currentTransacao.id}">
                <th scope="row">${currentTransacao.id}</th>
                <td>${currentTransacao.data}</td>
                <td>${transacaoTipoDescricao(currentTransacao.tipo)}</td>
                <td>${currentTransacao.categoria}</td>
                <td>${currentTransacao.descricao}</td>
                <td>${formataValorReal(Number(currentTransacao.valor))}</td>
            </tr>`, 
            true
        );
    }
}

function lertTransacoesCurrentConta() {
    const transacoes = consultarDados('transacoes');
    currentTransacoes = transacoes.filter((transacao) => transacao.conta_id === currentConta.id);
    return currentTransacoes;
}

function limparValores() {
    setaValoresInput('#categoria', null);
    setaValoresInput('#descricao', null);
    setaValoresInput('#valor', null);
    setaValoresInput('#valorTransferencia', null);
}

function atualizarSaldo(tipo, valor) {
    if(Number(tipo) === 0) {
        currentConta.saldo += Number(valor);
    } else {
        currentConta.saldo -= valor;
    }

    atualizarDado('contas', currentConta.id, currentConta);
    addConteudoHTML('#saldoConta', formataValorReal(currentConta.saldo), false);
}

function operacaoTransacao() {
    const tipo = pegaValoresInput('#tipo');
    const categoria = pegaValoresInput('#categoria');
    const descricao = pegaValoresInput('#descricao');
    const valor = pegaValoresInput('#valor');
    const data = new Date().toLocaleDateString();

    validacaoValoresInput('#criarTransacaoErrors', [
        {valor: descricao, mensagem: 'Informe a Descrição da transação.'},
        {valor: categoria, mensagem: 'Informe a Categoria da transação.'},
        {valor: valor, mensagem: 'Informe o Valor da transação.'}
    ]).then(() => {
            let novaTransacao;

            if(tipoOperacao === 0) {
                // cria nova transação
                novaTransacao = new Transacao(descricao, data, Number(tipo), categoria, valor, currentConta.id);
                adicionarDado('transacoes', novaTransacao);
                atualizarSaldo(novaTransacao.tipo, novaTransacao.valor);
            } else {
                // edita última transação
                currentTransacao = currentTransacoes.find((transacao) => transacao.id == currentTransacaoId);
                novaTransacao = {
                    id: currentTransacaoId,
                    descricao: descricao,
                    data: new Date().toLocaleDateString(),
                    tipo: tipo,
                    categoria: categoria,
                    valor: valor,
                    conta_id: currentConta.id,
                }

                atualizarDado('transacoes', currentTransacaoId, novaTransacao);
                removeConteudoHTML(`#i${novaTransacao.id}`);
                const novoValor = (currentTransacao.valor - valor);
                atualizarSaldo(novoValor < 0 ? 1 : 0, novoValor);
            }
            
            addConteudoHTML(
                '#tableBody', 
                `<tr id="i${novaTransacao.id}">
                    <th scope="row">${novaTransacao.id}</th>
                    <td>${novaTransacao.data}</td>
                    <td>${transacaoTipoDescricao(novaTransacao.tipo)}</td>
                    <td>${novaTransacao.categoria}</td>
                    <td>${novaTransacao.descricao}</td>
                    <td>${formataValorReal(Number(novaTransacao.valor))}</td>
                </tr>`,
                true
            );

            limparValores();
            fecharModal('#closeModalBtn');
        }
    ).catch((err) => console.error('Ocorreu um erro ao criar a conta', err));
}

function abrirModalEditarUltimaTransacao() {
    const transacoes = lertTransacoesCurrentConta();
    const indexUltimaTransacao = transacoes.length - 1;

    if(indexUltimaTransacao !== -1) {
        const currentTransacao = transacoes[indexUltimaTransacao];
        currentTransacaoId = currentTransacao.id;
        tipoOperacao = 1;

        setaValoresInput('#tipo', currentTransacao.tipo);
        setaValoresInput('#categoria', currentTransacao.categoria);
        setaValoresInput('#descricao', currentTransacao.descricao);
        setaValoresInput('#valor', currentTransacao.valor);

        addConteudoHTML('#labelBtnPrimaryModal', 'Editar transação', false);
        addConteudoHTML('#labelModalHeader', 'Edição de transação', false);
    }
}

function abrirModalCriarTransacao() {
    tipoOperacao = 0;
    limparValores();
    addConteudoHTML('#labelBtnPrimaryModal', 'Criar transação', false);
    addConteudoHTML('#labelModalHeader', 'Criação de transação', false);
}

function abrirModalTransferirFundos() {
    addConteudoHTML('#contaTransferencia', '', false);
    limparValores();

    for(const conta of currentContas) {
        addConteudoHTML('#contaTransferencia', `<option value="${conta.id}">${conta.descricao}</option>`, true);
    }
}

function transferirFundos() {
    const valorTransferencia = Number(pegaValoresInput('#valorTransferencia'));
    const contaTransferencia = pegaValoresInput('#contaTransferencia');
    const errorSelector = '#trasnferenciaErrors';
    
    validacaoValoresInput(errorSelector, [
        {valor: valorTransferencia, mensagem: 'Informe o Valor da transferência.'},
        {valor: contaTransferencia, mensagem: 'Informe a Conta da transferência.'}
    ]).then(() => {
        if(valorTransferencia > currentConta.saldo) {
            showElemento(errorSelector);
            addConteudoHTML(errorSelector, `<li>Saldo insuficiente.</li>`, true);
            return;
        }
        
        // adiciona transferencia de DEPOSITO na conta de origem
        const novaTransacaoOrigem = new Transacao('Transferência de fundos', new Date().toLocaleDateString(), 1, 'Saque', valorTransferencia, currentConta.id);
        adicionarDado('transacoes', novaTransacaoOrigem);
        atualizarSaldo(1, valorTransferencia);

        addConteudoHTML(
            '#tableBody', 
            `<tr id="i${novaTransacaoOrigem.id}">
                <th scope="row">${novaTransacaoOrigem.id}</th>
                <td>${novaTransacaoOrigem.data}</td>
                <td>${transacaoTipoDescricao(novaTransacaoOrigem.tipo)}</td>
                <td>${novaTransacaoOrigem.categoria}</td>
                <td>${novaTransacaoOrigem.descricao}</td>
                <td>${formataValorReal(Number(novaTransacaoOrigem.valor))}</td>
            </tr>`,
            true
        );

        // adiciona transferencia de SAQUE na conta de destino.
        const novaTransacaoDestino = new Transacao('Transferência de fundos', new Date().toLocaleDateString(), 0, 'Depósito', valorTransferencia, Number(contaTransferencia));
        adicionarDado('transacoes', novaTransacaoDestino);

        hideElemento(errorSelector);
        limparValores();
        fecharModal('#closeModalBtnFundos');
    }).catch((err) => console.error(err, 'erro ao transferir fundos'))
}

function abrirContas() {
    window.location.href = window.location.href.replace(`/transacao/transacoes.html${window.location.search}`, '/conta/contas.html')
}