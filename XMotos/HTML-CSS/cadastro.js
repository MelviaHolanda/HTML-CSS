// Validação de CPF 
function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Validação de senha
document.getElementById('senha').addEventListener('input', function () {
    const senha = this.value;
    this.setCustomValidity(""); // Limpa mensagens de validação anteriores

    if (senha.length < 8) {
        this.setCustomValidity("A senha deve ter no mínimo 8 caracteres.");
    }
});

// Captura o evento de envio do formulário para fazer as validações finais
document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário, pois faremos a validação manual

    const cpfInput = document.getElementById('cpf');
    const senhaInput = document.getElementById('senha');

    // 1. Validação do CPF
    if (!validarCPF(cpfInput.value)) {
        cpfInput.setCustomValidity("CPF inválido!");
        cpfInput.reportValidity(); // Mostra a mensagem de erro do CPF
        return; // Para o processo de envio
    } else {
        cpfInput.setCustomValidity(""); // Limpa a mensagem se o CPF for válido
    }

    // 2. Validação da Senha (comprimento mínimo de 8 caracteres)
    if (senhaInput.value.length < 8) {
        senhaInput.setCustomValidity("A senha deve ter no mínimo 8 caracteres.");
        senhaInput.reportValidity(); // Mostra a mensagem de erro da senha
        return; // Para o processo de envio
    } else {
        senhaInput.setCustomValidity(""); // Limpa a mensagem se a senha for válida
    }

    // Se todas as validações passaram:
    alert("Cadastro realizado com sucesso!");
    this.submit(); // Envia o formulário agora que tudo está validado
});
