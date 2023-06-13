let currentConta; 

let tipoOperacao = 0; // 0 = criar, 1 = editar
let currentTransacaoId = 0; // identificação da transação a ser editada

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

function atualizaSaldo(tipo, valor) {
    if(tipo === 0) {
        currentConta.saldo += valor;
    } else {
        currentConta.saldo -= valor;
    }

    addConteudoHTML('#saldoConta', formataValorReal(currentConta.saldo), false);
}

function validacaoValoresTransacao(valoresInfos) {
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

function operacaoTransacao() {
    const tipo = pegaValoresInput('#tipo');
    const categoria = pegaValoresInput('#categoria');
    const descricao = pegaValoresInput('#descricao');
    const valor = pegaValoresInput('#valor');
    const data = new Date().toLocaleDateString();

    validacaoValoresTransacao([
        {valor: descricao, mensagem: 'Informe a Descrição da transação.'},
        {valor: categoria, mensagem: 'Informe a Categoria da transação.'},
        {valor: valor, mensagem: 'Informe o Valor da transação.'}
    ]).then(() => {
            const novaTransacao = new Transacao(descricao, data, Number(tipo), categoria, valor);

            if(tipoOperacao === 0) {
                // cria nova transação
                currentConta.transacoes.push(novaTransacao);
            } else {
                // edita última transação
                const currentTransacaoIndex = currentConta.transacoes.findIndex((item) => item.id === currentTransacaoId);
                currentConta.transacoes[currentTransacaoIndex].descricao = novaTransacao.descricao;
                currentConta.transacoes[currentTransacaoIndex].tipo = novaTransacao.tipo;
                currentConta.transacoes[currentTransacaoIndex].valor = novaTransacao.valor;
                currentConta.transacoes[currentTransacaoIndex].categoria = novaTransacao.categoria;
            }
            // Todo: atualizar na tabela ultima transação editada;

            addConteudoHTML(
                '#tableBody', 
                `<tr>
                    <th scope="row">${novaTransacao.id}</th>
                    <td>${novaTransacao.data}</td>
                    <td>${transacaoTipoDescricao(novaTransacao.tipo)}</td>
                    <td>${novaTransacao.categoria}</td>
                    <td>${novaTransacao.descricao}</td>
                    <td>${novaTransacao.valor}</td>
                </tr>`,
                true
            );

            atualizaSaldo(novaTransacao.tipo, novaTransacao.valor);
            limpaValores();
            fechaModal();
        }
    ).catch((err) => console.error('Ocorreu um erro ao criar a conta', err));
}

function abrirModalEditarUltimaTransacao() {
    const indexUltimaTransacao = currentConta.transacoes.length - 1;

    if(indexUltimaTransacao !== -1) {
        const currentTransacao = currentConta.transacoes[indexUltimaTransacao];

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
    limpaValores();
    addConteudoHTML('#labelBtnPrimaryModal', 'Criar transação', false);
    addConteudoHTML('#labelModalHeader', 'Criação de transação', false);
}
