document.addEventListener('DOMContentLoaded', function() {
    carregarClientes(); // Carregar os clientes ao carregar a página

   // Ouvinte de eventos para o botão de atualização
   document.getElementById('btn-atualizar').addEventListener('click', function() {
    console.log('Botão de atualização clicado'); // Debugging
    carregarClientes(); // Chama a função para atualizar a lista de clientes
});
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
            const clienteInfo = document.createElement('div');
            clienteInfo.innerHTML = `
                <span>ID: ${cliente.id}, Nome: ${cliente.nome}, Descrição: ${cliente.descricao}, Quantidade: ${cliente.quantidade}</span>
            `;
            itemLista.appendChild(clienteInfo);

            const btnAtualizar = document.createElement('button');
            btnAtualizar.textContent = 'Atualizar';
            btnAtualizar.addEventListener('click', function() {
                mostrarFormularioAtualizacao(cliente);
            });
            itemLista.appendChild(btnAtualizar);

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', function() {
                excluirCliente(cliente.id);
            });
            itemLista.appendChild(btnExcluir);

            listaClientes.appendChild(itemLista);
        });
    })
    .catch(error => console.error('Erro ao carregar clientes:', error));
}

function mostrarFormularioAtualizacao(cliente) {
    const formAtualizar = document.getElementById('form-atualizar');
    console.log('Formulário de atualização:', formAtualizar); // Debugging
    const idInput = document.getElementById('id-atualizar');
    const nomeInput = document.getElementById('nome-atualizar');
    const descricaoInput = document.getElementById('descricao-atualizar');
    const quantidadeInput = document.getElementById('quantidade-atualizar');

    console.log('Formulário de atualização:', formAtualizar); // Debugging

    if (formAtualizar) {
        idInput.value = cliente.id;
        nomeInput.value = cliente.nome;
        descricaoInput.value = cliente.descricao;
        quantidadeInput.value = cliente.quantidade;

        formAtualizar.style.display = 'block';
    } else {
        console.error('Formulário de atualização não encontrado.');
    }
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
