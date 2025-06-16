function toggleMenu() {
    const nav = document.querySelector('.nav-list');
    nav.classList.toggle('active');
}



// Slider de imagens (mantido igual)
let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 5000);

function nextImage() {
    count++;
    if (count > 4) {
        count = 1;
    }
    document.getElementById("radio" + count).checked = true;
}

// Sistema de carrinho (mantido igual)
function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(item =>
        item.nome === produto.nome &&
        item.preco === produto.preco &&
        item.imagem === produto.imagem
    );

    if (produtoExistente) {
        produtoExistente.quantidade = produtoExistente.quantidade ? produtoExistente.quantidade + 1 : 2;
    } else {
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${produto.nome} foi adicionado ao carrinho!`);
    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const contadorCarrinho = document.getElementById('contador-carrinho');
    if (contadorCarrinho) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        contadorCarrinho.textContent = carrinho.length;
        contadorCarrinho.style.display = carrinho.length > 0 ? 'block' : 'none';
    }
}

// Ícone do carrinho (mantido igual)
function criarIconeCarrinho() {
    const menu = document.getElementById('menu');
    if (menu) {
        const linkCarrinho = document.createElement('a');
        linkCarrinho.href = 'carrinho.html';
        linkCarrinho.id = 'carrinho-link';
        linkCarrinho.innerHTML = `
            <span id="contador-carrinho" style="display: none;"></span>
            <img src="img/Y" alt="Carrinho" style="width: 50px; height: 50px; padding: 20px">
        `;
        menu.appendChild(linkCarrinho);
        atualizarContadorCarrinho();
    }
}

// Sistema de produtos por categoria (nova implementação)
document.addEventListener('DOMContentLoaded', function () {
    criarIconeCarrinho();

    const produtos = [
        {
            nome: "Capacete LS2",
            descricao: "Capacete de alta performance com design moderno.",
            preco: "R$ 499,99",
            imagem: "img/LS2.jpg",
            categoria: "capacetes"
        },
        {
            nome: "Capacete Norisk",
            descricao: "Capacete com alta resistência e conforto.",
            preco: "R$ 349,99",
            imagem: "img/NORISK.jpg",
            categoria: "capacetes"
        },
        {
            nome: "Pinhão e Coroa",
            descricao: "Pinhão e coroa de alta durabilidade para motos.",
            preco: "R$ 129,99",
            imagem: "img/PinhaoECoroa.jpg",
            categoria: "engrenagens"
        },
        {
            nome: "Filtro BMS",
            descricao: "Filtro de ar de alta qualidade para sua moto.",
            preco: "R$ 89,99",
            imagem: "img/BMSfilters.jpg",
            categoria: "filtros"
        },
        {
            nome: "Kit Corrente Completo",
            descricao: "Kit completo para transmissão.",
            preco: "R$ 249,99",
            imagem: "img/PinhaoECoroa.jpg",
            categoria: "engrenagens"
        }
    ];

    const servicos = [
        {
            id: 1,
            nome: "Troca de Óleo",
            categoria: "filtros",
            descricao: "Serviço rápido e eficiente."
        },
        {
            id: 2,
            nome: "Ajuste de Freio",
            categoria: "engrenagens",
            descricao: "Ajuste preciso para sua moto."
        }
        // Adicione mais serviços conforme necessário
    ];

    const produtosContainer = document.querySelector('.produtos_container');
    const filtroBtns = document.querySelectorAll('.filtro-btn');

    function exibirProdutos(categoria = 'todos') {
        produtosContainer.innerHTML = '';

        const produtosFiltrados = categoria === 'todos'
            ? produtos
            : produtos.filter(produto => produto.categoria === categoria);

        produtosFiltrados.forEach(produto => {
            const produtoCard = document.createElement('div');
            produtoCard.className = 'produto-card';
            produtoCard.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
                <div class="produto-info">
                    <span class="produto-categoria">${produto.categoria.toUpperCase()}</span>
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <p class="produto-descricao">${produto.descricao}</p>
                    <span class="produto-preco">${produto.preco}</span>
                    <button class="botao-comprar" data-produto='${JSON.stringify(produto)}'>Adicionar ao Carrinho</button>
                </div>
            `;
            produtosContainer.appendChild(produtoCard);
        });

        // Adiciona eventos aos novos botões
        document.querySelectorAll('.botao-comprar').forEach(btn => {
            btn.addEventListener('click', function () {
                const produto = JSON.parse(this.dataset.produto);
                adicionarAoCarrinho(produto);
            });
        });
    }

    function renderServicos(filtrarCategoria = "todos") {
        const container = document.querySelector(".servicos_container");
        container.innerHTML = "";

        const servicosFiltrados = filtrarCategoria === "todos" ? servicos : servicos.filter(serv => serv.categoria === filtrarCategoria);

        servicosFiltrados.forEach(serv => {
            const servicoDiv = document.createElement("div");
            servicoDiv.classList.add("row_produtos");
            servicoDiv.innerHTML = `
            <h2>${serv.nome}</h2>
            <p>${serv.descricao}</p>
          `;
            container.appendChild(servicoDiv);
        });
    }



    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            exibirProdutos(this.dataset.categoria);
        });
    });

    exibirProdutos();

    // -----------------------------
});