document.addEventListener('DOMContentLoaded', function() {
    const listaClientes = document.getElementById('clientes-lista');

    function listarClientes() {
        fetch('http://localhost:8080/clientes', {
            method: "GET"    
        })
        .then(response => response.json())
        .then(data => {
            listaClientes.innerHTML = ''; // Limpa a lista antes de adicionar os itens

            data.forEach(cliente => {
                const itemLista = document.createElement('li');
                itemLista.innerHTML = `
                    <span>ID: ${cliente.id}, Nome: <span id="nome-${cliente.id}">${cliente.nome}</span>, Descrição: <span id="descricao-${cliente.id}">${cliente.descricao}</span>, Quantidade: <span id="quantidade-${cliente.id}">${cliente.quantidade}</span></span>
                    <button onclick="editarCliente(${cliente.id})">Editar</button>
                `;
                listaClientes.appendChild(itemLista);
            });
        })
        .catch(error => console.error('Erro ao listar clientes:', error));
    }

    listarClientes(); // Chama a função para listar os clientes ao carregar a página

    document.getElementById('btn-atualizar').addEventListener('click', function() {
        // Chama a função para atualizar a lista de clientes
        listarClientes();
    });
});

function editarCliente(id) {
    console.log('Editar cliente chamado para o ID:', id);

    const nomeSpan = document.getElementById(`nome-${id}`);
    const descricaoSpan = document.getElementById(`descricao-${id}`);
    const quantidadeSpan = document.getElementById(`quantidade-${id}`);

    const novoNome = prompt('Novo Nome:', nomeSpan.textContent);
    const novaDescricao = prompt('Nova Descrição:', descricaoSpan.textContent);
    const novaQuantidade = prompt('Nova Quantidade:', quantidadeSpan.textContent);

    if (novoNome !== null && novaDescricao !== null && novaQuantidade !== null) {
        // Atualiza os valores na lista
        nomeSpan.textContent = novoNome;
        descricaoSpan.textContent = novaDescricao;
        quantidadeSpan.textContent = novaQuantidade;

        // Aqui você pode enviar uma requisição PUT para atualizar os dados no servidor, se necessário
          fetch(`http://localhost:8080/clientes/${id}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 nome: novoNome,
                 descricao: novaDescricao,
                 quantidade: novaQuantidade
             })
         })
         .then(response => response.json())
         .then(data => {
             console.log('Cliente atualizado com sucesso:', data);
        })
         .catch(error => console.error('Erro ao atualizar cliente:', error));
    }
}
