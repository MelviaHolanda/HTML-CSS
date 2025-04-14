let count = 1;
document.getElementById("radio1").checked=true;

setInterval(function(){
    nextImage();
},5000)

function nextImage(){
    count++;
    if(count>4){
        count=1;
    }

    document.getElementById("radio"+count).checked=true;

}

const produtos = [
    {
        nome: "Capacete LS2",
        descricao: "Capacete de alta performance com design moderno.",
        preco: "R$ 499,99",
        imagem: "img/LS2.jpg"
    },
    {
        nome: "Capacete Norisk",
        descricao: "Capacete com alta resistência e conforto.",
        preco: "R$ 349,99",
        imagem: "img/NORISK.jpg"
    },
    {
        nome: "Pinhão e Coroa",
        descricao: "Pinhão e coroa de alta durabilidade para motos.",
        preco: "R$ 129,99",
        imagem: "img/PinhaoECoroa.jpg"
    },
    {
        nome: "Filtro BMS",
        descricao: "Filtro de ar de alta qualidade para sua moto.",
        preco: "R$ 89,99",
        imagem: "img/BMSfilters.jpg"
    },
    {
        nome: "Filtro BMS",
        descricao: "Filtro de ar de alta qualidade para sua moto.",
        preco: "R$ 89,99",
        imagem: "img/BMSfilters.jpg"
    }
];

// Seleciona o contêiner onde os produtos serão exibidos
const produtosContainer = document.querySelector('.produtos_list');

// Itera sobre os produtos e cria o HTML para cada um
for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];

    // Cria um novo elemento de produto
    const produtoElement = document.createElement('div');
    produtoElement.classList.add('row_produtos');
    
    produtoElement.innerHTML = `
        <h2>${produto.nome}</h2>
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <p>Descrição: ${produto.descricao}</p>
        <p>Preço: ${produto.preco}</p>
        <button id="btn">Adicionar</button>
    `;

    // Adiciona o novo elemento ao contêiner de produtos
    produtosContainer.appendChild(produtoElement);
}