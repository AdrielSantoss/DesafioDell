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
    }
}