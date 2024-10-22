const apiUrl = 'https://localhost:7081/api/produtos'; // URL da sua API

// Função para buscar produtos
function buscarProdutos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const listaProdutos = document.getElementById('lista-produtos');
      listaProdutos.innerHTML = ''; // Limpa a lista
      // Adiciona cada produto na lista
      data.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`; // Formata o preço
        listaProdutos.appendChild(li);
      });
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Função para adicionar um produto
function adicionarProduto(event) {
  event.preventDefault();

  const nome = document.getElementById('nome-produto').value;
  const preco = document.getElementById('preco-produto').value;

  // Enviar o produto para a API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: null,
      nome: nome,
      preco: parseFloat(preco)
    })
  })
    .then(response => response.json())
    .then(() => {
      buscarProdutos(); // Atualiza a lista de produtos
      document.getElementById('form-produto').reset(); // Limpa o formulário
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
}

// Adiciona o evento ao formulário
document.getElementById('form-produto').addEventListener('submit', adicionarProduto);

// Carrega a lista de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', buscarProdutos);
