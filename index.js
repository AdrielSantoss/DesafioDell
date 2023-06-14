window.onload = () => {
    lerTodasContas();
    carregarReceitasDoMes('#tableBodyResumoReceitas', 0);
    carregarReceitasDoMes('#tableBodyResumoDespesas', 1);
    carregarResumoSaldo();
}

function lerTodasContas() {
    addConteudoHTML('#tableBodyContas', '', false);
    const contas = consultarDados('contas');

    if(contas !== null){
        let saldoTotal = 0;

        for (const currentConta of contas) {
            const transacoes = consultarDados('transacoes');
            const currentTransacoes = transacoes.filter((transacao) => transacao.conta_id === currentConta.id);

            if(currentConta.saldo) {
                saldoTotal += Number(currentConta.saldo);
            }
            
            addConteudoHTML(
                '#tableBodyContas', 
                `<tr>
                    <td>${currentConta.banco}</td>
                    <td>${currentConta.descricao}</td>
                    <td>${currentConta.numeroConta}</td>
                    <td>${currentConta.agencia}</td>
                    <td>${currentTransacoes.length}</td>
                    <td>${formataValorReal(Number(currentConta.saldo))}</td>
                </tr>`, 
                true
            );
        }

        addConteudoHTML('#saldoTotal', formataValorReal(saldoTotal), false);
    }
}

function carregarReceitasDoMes(selector, tipo) {
    const currentMes = new Date().getMonth();
    const transacoes = consultarDados('transacoes');
    const receitasDoMes = transacoes.filter((transacao) => transacao.tipo == tipo && (new Date(transacao.data).getMonth() == currentMes));
    const contas = consultarDados('contas');
    
    for (const transacao of receitasDoMes) {
        const currentContaDaTransacao = contas.find((conta) => conta.id === transacao.conta_id);
        addConteudoHTML(
            selector, 
            `<tr id="i${transacao.id}">
                <td>${currentContaDaTransacao?.descricao}</td>
                <td>${new Date(transacao.data).toLocaleDateString("pt-BR")}</td>
                <td>${transacaoTipoDescricao(transacao.tipo)}</td>
                <td>${transacao.categoria}</td>
                <td>${transacao.descricao}</td>
                <td>${formataValorReal(Number(transacao.valor))}</td>
            </tr>`,
            true
        );
    }
}

function carregarResumoSaldo() {
    const ultimosMesesData = new Date(new Date().setMonth(-6));
    const transacoes = consultarDados('transacoes');
    const resumo = transacoes.filter((transacao) => (new Date(transacao.data) >= ultimosMesesData));
    let saldoTotal = 0;

    for (const transacao of resumo) {
        saldoTotal += transacao.valor;
        addConteudoHTML(
            '#tableBodyResumoSaldo', 
            `<tr id="i${transacao.id}">
                <td>${new Date(transacao.data).toLocaleDateString()}</td>
                <td>${transacaoTipoDescricao(transacao.tipo)}</td>
                <td>${transacao.categoria}</td>
                <td>${transacao.descricao}</td>
                <td>${formataValorReal(Number(transacao.valor))}</td>
            </tr>`,
            true
        );
    }

    addConteudoHTML('#saldoTotalResumo', formataValorReal(saldoTotal), false);
}

function abrirContas() {
    window.location.href = window.location.href.replace('/index.html', '/conta/contas.html')
}
