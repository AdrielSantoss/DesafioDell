let currentConta;

window.onload = () => {
    carregaConta();
}

function carregaConta() {
    const queryParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

    if(queryParams?.id) {
        currentConta = currentContas.find((item) => item.id == queryParams?.id);
        addConteudoHTML('#descricaoConta', currentConta.descricao, false);
        addConteudoHTML('#saldoConta', formataValorReal(currentConta.saldo), false);
        lerTodasTransacoes('#saldoConta', currentConta.saldo, false);
    }
}

function transacaoTipoDescricao(codTipo) {
    return codTipo === 1 ? 'Despesa' : 'Receita';
}

function lerTodasTransacoes() {
    addConteudoHTML('#tableBody', '', false);

    for (const index in currentConta.transacoes) {
        const currentTransacao = currentConta.transacoes[index];
        
        addConteudoHTML(
            '#tableBody', 
            `<tr>
                <th scope="row">${currentTransacao.id}</th>
                <td>${currentTransacao.data}</td>
                <td>${transacaoTipoDescricao(currentTransacao.tipo)}</td>
                <td>${currentTransacao.categoria}</td>
                <td>${currentTransacao.descricao}</td>
                <td>${currentTransacao.valor}</td>
                <td>
                    bla
                </td>
            </tr>`, 
            true
        );
    }
}

function limpaValores() {
    setaValoresInput('#categoria', null);
    setaValoresInput('#descricao', null);
    setaValoresInput('#valor', null);
}

function validacaoValoresCriacaoTransacao(valoresInfos) {
    return new Promise((resolve, reject) => {
        let contemInvalidos = false;
        const errorElement = '#criarTransacaoErrors';
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

function criaTransacao() {
    const tipo = pegaValoresInput('#tipo');
    const categoria = pegaValoresInput('#categoria');
    const descricao = pegaValoresInput('#descricao');
    const valor = pegaValoresInput('#valor');
    const data = new Date().toLocaleDateString();

    console.log(tipo, categoria, descricao, valor, data)

    validacaoValoresCriacaoTransacao([
        {valor: descricao, mensagem: 'Informe a Descrição da transação.'},
        {valor: categoria, mensagem: 'Informe a Categoria da transação.'},
        {valor: valor, mensagem: 'Informe o Valor da transação.'}
    ]).then(() => {
            // Adicionando nova conta que foi validada
            // const novaConta = new Conta(descricao, nomeBanco, agencia, numeroConta);
            // currentContas.push(novaConta);
            // // arruamr infos aqui
            // addConteudoHTML(
            //     '#tableBody', 
            //     `<tr>
            //         <th scope="row">${novaConta.id}</th>
            //         <td>${novaConta.banco}</td>
            //         <td>${novaConta.descricao}</td>
            //         <td>${novaConta.agencia}</td>
            //         <td>${novaConta.saldo}</td>
            //         <td>
            //             <button type="button" class="btn btn-primary" onclick="abrirConta('${novaConta.id}')">
            //                 Infos
            //             </button>
            //             <button type="button" class="btn btn-warning" onclick="excluirConta('${novaConta.id}')">
            //                 Mesclar
            //             </button>
            //             <button type="button" class="btn btn-danger" onclick="excluirConta('${novaConta.id}')">
            //                 Excluir
            //             </button>
            //         </td>
            //     </tr>`,
            //     true
            // );
            limpaValores();
            fechaModal();
        }
    ).catch((err) => console.error('Ocorreu um erro ao criar a conta', err));
}
