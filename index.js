// UTILS FUNCTIONS
function pegaValoresInput(input) {
    const elemento = document.querySelector(input);

    if(elemento) {
        return elemento.value;
    }

    return null;
}

function showElemento(selector) {
    const elemento = document.querySelector(selector);
    elemento.style.display = 'block';
}

function hideElemento(selector) {
    const elemento = document.querySelector(selector);
    elemento.style.display = 'none';
}


// CRIAR CONTA FUNCTIONS

function validacaoValores(valoresInfos) {
    let success = true;
    const errorsElemento = document.querySelector('#criarContaErrors');

    for (const index in valoresInfos) {
        const currentValor = valoresInfos[index];

        if(!currentValor.valor) {
            showElemento('#criarContaErrors');

            errorsElemento.innerHTML += `
                <ul>
                    <li>${currentValor.mensagem}</li>
                </ul>`;

            success = false;
        }
    }

    if(success) {
        hideElemento('#criarContaErrors');
    }

    return success;
}

function criarConta() {
    const nomeBanco = pegaValoresInput('#nomeBanco');
    const agencia = pegaValoresInput('#agencia');
    const numeroConta = pegaValoresInput('#numeroConta');

    validacaoValores([
        {valor: nomeBanco, mensagem: 'Informe o Nome do banco'},
        {valor: agencia, mensagem: 'Informe a Agência'},
        {valor: numeroConta, mensagem: 'Informe o Número da Conta'},
    ]);
}

 