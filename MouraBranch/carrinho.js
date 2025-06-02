document.addEventListener('DOMContentLoaded', function () {
    // Elementos da página
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const conteudoCarrinho = document.getElementById('conteudo-carrinho');
    const itensCarrinho = document.querySelector('.itens-carrinho');
    const btnFinalizar = document.getElementById('finalizar-compra');

    // Carrega o carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Atualiza a exibição do carrinho
    function atualizarCarrinho() {
        if (carrinho.length === 0) {
            carrinhoVazio.style.display = 'block';
            conteudoCarrinho.style.display = 'none';
        } else {
            carrinhoVazio.style.display = 'none';
            conteudoCarrinho.style.display = 'flex';
            renderizarItens();
            calcularTotal();
        }
        atualizarContador();
    }

    // Renderiza os itens do carrinho
    function renderizarItens() {
        itensCarrinho.innerHTML = '';

        carrinho.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrinho';
            itemElement.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="info-item">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <p class="preco-item">${item.preco}</p>
                    <div class="controles-item">
                        <button class="btn-diminuir">-</button>
                        <input type="number" min="1" value="${item.quantidade || 1}" class="quantidade-item">
                        <button class="btn-aumentar">+</button>
                        <button class="btn-remover" data-index="${index}">Remover</button>
                    </div>
                </div>
            `;
            itensCarrinho.appendChild(itemElement);
        });

        // Adiciona eventos aos controles
        document.querySelectorAll('.btn-diminuir').forEach(btn => {
            btn.addEventListener('click', diminuirQuantidade);
        });

        document.querySelectorAll('.btn-aumentar').forEach(btn => {
            btn.addEventListener('click', aumentarQuantidade);
        });

        document.querySelectorAll('.quantidade-item').forEach(input => {
            input.addEventListener('change', alterarQuantidade);
        });

        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', removerItem);
        });
    }

    // Calcula o total do pedido
    function calcularTotal() {
        const subtotal = carrinho.reduce((total, item) => {
            const preco = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
            return total + (preco * (item.quantidade || 1));
        }, 0);

        const frete = subtotal > 300 ? 0 : 25;
        const total = subtotal + frete;

        document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        document.getElementById('frete').textContent = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`;
        document.getElementById('total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Atualiza o contador no ícone do carrinho
    function atualizarContador() {
        const contador = document.getElementById('contador-carrinho');
        const totalItens = carrinho.reduce((total, item) => total + (item.quantidade || 1), 0);

        if (totalItens > 0) {
            contador.textContent = totalItens;
            contador.style.display = 'inline-block';
        } else {
            contador.style.display = 'none';
        }
    }

    // Funções para manipular o carrinho
    function diminuirQuantidade(e) {
        const input = e.target.nextElementSibling;
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            atualizarItem(input);
        }
    }

    function aumentarQuantidade(e) {
        const input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        atualizarItem(input);
    }

    function alterarQuantidade(e) {
        atualizarItem(e.target);
    }

    function atualizarItem(input) {
        const itemElement = input.closest('.item-carrinho');
        const index = Array.from(document.querySelectorAll('.item-carrinho')).indexOf(itemElement);

        if (index !== -1) {
            carrinho[index].quantidade = parseInt(input.value);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            calcularTotal();
            atualizarContador();
        }
    }

    function removerItem(e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    // Finalizar compra
    btnFinalizar.addEventListener('click', function () {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        alert('Compra finalizada com sucesso! Obrigado por comprar na XMotos.');
        localStorage.removeItem('carrinho');
        carrinho.length = 0;
        atualizarCarrinho();
    });

    // Inicializa o carrinho
    atualizarCarrinho();
});