// js/edit-tarefa.js

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const editForm = document.getElementById('edit-tarefa-form');
    const descricaoInput = document.getElementById('tarefa-descricao');
    const disciplinaSelect = document.getElementById('tarefa-disciplina');
    const dataInput = document.getElementById('tarefa-data');
    const logoutBtn = document.getElementById('logout-btn');

    if (!token) { window.location.href = 'index.html'; return; }
    
    const urlParams = new URLSearchParams(window.location.search);
    const tarefaId = urlParams.get('id');

    if (!tarefaId) { window.location.href = 'disciplinas.html'; return; }

    const apiClient = axios.create({
        baseURL: '/api', 
        headers: { 'Authorization': `Bearer ${token}` }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });

    // --- BUSCAR DADOS E PREENCHER O FORMULÁRIO ---
    try {
        // Busca os dados da tarefa E a lista de todas as disciplinas em paralelo
        const [tarefaResponse, disciplinasResponse] = await Promise.all([
            apiClient.get(`/tarefas/${tarefaId}`),
            apiClient.get('/disciplinas')
        ]);

        const tarefa = tarefaResponse.data;
        const disciplinas = disciplinasResponse.data;

        // Preenche os campos do formulário
        descricaoInput.value = tarefa.descricao;
        if (tarefa.dataEntrega) {
            // Formata a data para AAAA-MM-DD para o input type="date"
            dataInput.value = tarefa.dataEntrega.split('T')[0];
        }

        // Popula o select de disciplinas
        disciplinaSelect.innerHTML = '';
        disciplinas.forEach(disciplina => {
            const option = document.createElement('option');
            option.value = disciplina.id;
            option.textContent = disciplina.nome;
            // Marca como selecionada a disciplina atual da tarefa
            if (disciplina.id === tarefa.disciplinaId) {
                option.selected = true;
            }
            disciplinaSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar dados para edição:', error);
        alert('Não foi possível carregar os dados. Redirecionando...');
        window.location.href = 'disciplinas.html';
    }

    // --- LÓGICA DE ENVIO DO FORMULÁRIO (UPDATE) ---
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const dadosAtualizados = {
            descricao: descricaoInput.value,
            disciplinaId: disciplinaSelect.value,
            dataEntrega: dataInput.value ? `${dataInput.value}T23:59:00Z` : null
        };

        try {
            await apiClient.put(`/tarefas/${tarefaId}`, dadosAtualizados);
            alert('Tarefa atualizada com sucesso!');
            window.location.href = `tarefas.html?id=${dadosAtualizados.disciplinaId}`;
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            alert('Não foi possível salvar as alterações.');
        }
    });
});