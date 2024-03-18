document.addEventListener('DOMContentLoaded', function() {
    const formAdicionar = document.getElementById('form-adicionar');
    formAdicionar.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const quantidade = document.getElementById('quantidade').value;

        const novoCliente = {
            nome: nome,
            descricao: descricao,
            quantidade: quantidade
        };

        fetch('http://localhost:8080/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar cliente');
            }
            return response.json();
        })
        .then(data => {
            alert('Cliente adicionado com sucesso!');
            // Redirecionar para a página de listagem de clientes ou realizar outra ação
        })
        .catch(error => {
            console.error('Erro ao adicionar cliente:', error);
            alert('Erro ao adicionar cliente. Verifique o console para mais detalhes.');
        });
    });
});
