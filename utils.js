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

function formataValorReal(valor) {
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}