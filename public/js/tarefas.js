    document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const disciplinaTitulo = document.getElementById('disciplina-titulo');
    const tarefasTbody = document.getElementById('tarefas-tbody');
    const logoutBtn = document.getElementById('logout-btn');
    const addTarefaBtn = document.getElementById('add-tarefa-btn');

    // --- 1. GUARDA DE AUTENTICAÇÃO E BUSCA DO ID ---
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const disciplinaId = urlParams.get('id');

    if (!disciplinaId) {
        alert('ID da disciplina não encontrado. Redirecionando...');
        window.location.href = 'disciplinas.html';
        return;
    }

    // Atualiza o link do botão "+ Adicionar Nova Tarefa"
    addTarefaBtn.href = `add-tarefa.html?disciplinaId=${disciplinaId}`;

    // --- 2. CONFIGURAÇÃO DO AXIOS ---
    const apiClient = axios.create({
        baseURL: '/api', 
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // --- 3. FUNÇÃO DE LOGOUT ---
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });

    // --- 4. FUNÇÃO PRINCIPAL PARA CARREGAR DADOS ---
    const carregarDados = async () => {
        try {
            // Técnica avançada: Fazer as duas chamadas à API em paralelo!
            const [disciplinaResponse, tarefasResponse] = await Promise.all([
                apiClient.get(`/disciplinas/${disciplinaId}`),
                apiClient.get(`/disciplinas/${disciplinaId}/tarefas`)
            ]);
            
            const disciplina = disciplinaResponse.data;
            const tarefas = tarefasResponse.data;

            // Atualiza o título da página com o nome da disciplina
            disciplinaTitulo.textContent = `Tarefas de ${disciplina.nome}`;

            // Limpa a tabela
            tarefasTbody.innerHTML = '';


            if (tarefas.length === 0) {
                tarefasTbody.innerHTML = '<tr><td colspan="4">Nenhuma tarefa cadastrada para esta disciplina.</td></tr>';
            } else {
                tarefas.forEach(tarefa => {
                    const tr = document.createElement('tr');
                    
                    // Formata a data para um padrão brasileiro (opcional mas legal)
                    const dataEntrega = tarefa.dataEntrega 
                    ? new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR') 
                    : 'Não definida';

                    tr.innerHTML = `
                        <td>${tarefa.descricao}</td>
                        <td>${tarefa.concluida ? 'Concluída ✅' : 'Pendente ⏳'}</td>
                        <td>${dataEntrega}</td>
                        <td class="actions-cell">
                            <button class="icon-btn btn-toggle-status" data-id="${tarefa.id}" data-status="${tarefa.concluida}" title="${tarefa.concluida ? 'Reabrir Tarefa' : 'Concluir Tarefa'}">
                                <i class="fas ${tarefa.concluida ? 'fa-undo-alt' : 'fa-check-square'}"></i>
                            </button>
                            <a href="edit-tarefa.html?id=${tarefa.id}" class="icon-btn" title="Editar Tarefa">
                                <i class="fas fa-pencil-alt"></i>
                            </a>
                            <button class="icon-btn btn-delete" data-id="${tarefa.id}" title="Excluir Tarefa">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    `;
                    tarefasTbody.appendChild(tr);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            if (error.response && error.response.status === 403) {
                // Token inválido, faz logout
                localStorage.removeItem('authToken');
                window.location.href = 'index.html';
            }
        }
    };

    tarefasTbody.addEventListener('click', async (event) => {
    const target = event.target; // O elemento exato que foi clicado (ex: o botão)

    // AÇÃO DE DELETAR
    if (target.matches('.btn-delete')) {
        const tarefaId = target.dataset.id;
        const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");

        if (confirmar) {
            try {
                await apiClient.delete(`/tarefas/${tarefaId}`);
                carregarDados(); // Recarrega a lista para mostrar as mudanças
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
                alert("Não foi possível excluir a tarefa.");
            }
        }
    }

    // AÇÃO DE CONCLUIR / REABRIR
    if (target.matches('.btn-toggle-status')) {
        const tarefaId = target.dataset.id;
        // O status atual vem como string ('true' ou 'false'), então convertemos para booleano
        const statusAtual = target.dataset.status === 'true'; 

        try {
            // Enviamos o status INVERTIDO para a API
            await apiClient.put(`/tarefas/${tarefaId}`, { concluida: !statusAtual });
            carregarDados(); // Recarrega a lista para mostrar as mudanças
        } catch (error) {
            console.error("Erro ao atualizar status da tarefa:", error);
            alert("Não foi possível atualizar o status da tarefa.");
        }
    }
});

tarefasTbody.addEventListener('click', async (event) => {
    
    // AÇÃO DE DELETAR
    const deleteButton = event.target.closest('.btn-delete');
    if (deleteButton) {
        const tarefaId = deleteButton.dataset.id;
        const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");

        if (confirmar) {
            try {
                await apiClient.delete(`/tarefas/${tarefaId}`);
                carregarDados(); // Recarrega a lista
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
                alert("Não foi possível excluir a tarefa.");
            }
        }
        return; // Para a execução para não checar o outro botão
    }

    // AÇÃO DE CONCLUIR / REABRIR
    const toggleButton = event.target.closest('.btn-toggle-status');
    if (toggleButton) {
        const tarefaId = toggleButton.dataset.id;
        const statusAtual = toggleButton.dataset.status === 'true'; 

        try {
            await apiClient.put(`/tarefas/${tarefaId}`, { concluida: !statusAtual });
            carregarDados(); // Recarrega a lista
        } catch (error) {
            console.error("Erro ao atualizar status da tarefa:", error);
            alert("Não foi possível atualizar o status da tarefa.");
        }
    }
});


    // --- 5. EXECUÇÃO INICIAL ---
    carregarDados();
});