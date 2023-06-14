// FUNÇÕES GENÉRICAS

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

function validacaoValoresInput(errorSelector, valoresInfos) {
    return new Promise((resolve, reject) => {
        let contemInvalidos = false;
        addConteudoHTML(errorSelector, '', false);
    
        for (const index in valoresInfos) {
            const currentValor = valoresInfos[index];
    
            if(!currentValor.valor) {
                showElemento(errorSelector);
                addConteudoHTML(errorSelector, `<li>${currentValor.mensagem}</li>`, true);
                contemInvalidos = true;
            }
        }
    
        if(!contemInvalidos) {
            // não possui erros nos input
            hideElemento(errorSelector);
            resolve();
        } else {
            // possui erros nos input
            reject();
        }
    })
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

function removeConteudoHTML(selector) {
    const elemento = document.querySelector(selector);
    elemento.remove();
}

function fecharModal(selector) {
    const elemento = document.querySelector(selector);
    elemento.click();
}

function formataValorReal(valor) {
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function transacaoTipoDescricao(codTipo) {
    return Number(codTipo) === 1 ? 'Despesa' : 'Receita';
}
