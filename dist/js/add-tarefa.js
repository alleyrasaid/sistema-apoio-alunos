document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const addTarefaForm = document.getElementById('add-tarefa-form');
    const descricaoInput = document.getElementById('tarefa-descricao');
    const disciplinaSelect = document.getElementById('tarefa-disciplina');
    const dataInput = document.getElementById('tarefa-data');
    const logoutBtn = document.getElementById('logout-btn');

    // --- 1. GUARDA DE AUTENTICAÇÃO ---
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // --- 2. FUNÇÃO DE LOGOUT ---
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });

    // --- 3. CONFIGURAÇÃO DO AXIOS ---
    const apiClient = axios.create({
        baseURL: '/api', 
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // --- 4. POPULAR O SELECT DE DISCIPLINAS ---
    try {
        const response = await apiClient.get('/disciplinas');
        const disciplinas = response.data;
        
        // Limpa as opções de carregamento
        disciplinaSelect.innerHTML = '<option value="" disabled selected>Selecione a disciplina</option>';

        if (disciplinas.length === 0) {
            disciplinaSelect.innerHTML = '<option value="" disabled selected>Nenhuma disciplina cadastrada</option>';
        } else {
            disciplinas.forEach(disciplina => {
                const option = document.createElement('option');
                option.value = disciplina.id; // O valor será o ID da disciplina
                option.textContent = disciplina.nome; // O texto será o nome
                disciplinaSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
    }

    // --- 5. LÓGICA DO FORMULÁRIO ---
    addTarefaForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const descricao = descricaoInput.value;
        const disciplinaId = disciplinaSelect.value;
        const dataEntrega = dataInput.value; // Formato AAAA-MM-DD

        // Validação
        if (!descricao.trim() || !disciplinaId) {
            return alert('Descrição e disciplina são obrigatórias.');
        }

        const tarefaData = {
            descricao: descricao,
            // Adiciona a hora para formar uma data completa no formato ISO
            dataEntrega: dataEntrega ? `${dataEntrega}T23:59:00Z` : null
        };

        try {
            // Chama o endpoint para CRIAR a tarefa DENTRO da disciplina selecionada
            await apiClient.post(`/disciplinas/${disciplinaId}/tarefas`, tarefaData);

            alert('Tarefa adicionada com sucesso!');
            // Redireciona para a lista de tarefas daquela disciplina
            window.location.href = `tarefas.html?id=${disciplinaId}`;

        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            alert('Não foi possível adicionar a tarefa. Tente novamente.');
        }
    });
});