document.addEventListener('DOMContentLoaded', function() {
    carregarClientes(); // Carregar os clientes ao carregar a página
});

function carregarClientes() {
    fetch('http://localhost:8080/clientes', {
        method: "GET"    
    })
    .then(response => response.json())
    .then(data => {
        const listaClientes = document.getElementById('clientes-lista');
        listaClientes.innerHTML = ''; // Limpa a lista antes de adicionar os itens

        data.forEach(cliente => {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `
                <span>ID: ${cliente.id}, Nome: ${cliente.nome}</span>
                <button onclick="excluirCliente(${cliente.id})">Excluir</button>
            `;
            listaClientes.appendChild(itemLista);
        });
    })
    .catch(error => console.error('Erro ao carregar clientes:', error));
}

function excluirCliente(id) {
    if (confirm('Tem certeza de que deseja excluir este cliente?')) {
        fetch(`http://localhost:8080/clientes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Cliente excluído com sucesso');
                carregarClientes(); // Recarregar a lista de clientes após a exclusão
            } else {
                throw new Error('Erro ao excluir cliente');
            }
        })
        .catch(error => console.error(error));
    }
}
