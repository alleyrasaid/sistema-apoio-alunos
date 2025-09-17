// js/editar-disciplina.js

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const editForm = document.getElementById('edit-disciplina-form');
    const disciplinaNomeInput = document.getElementById('disciplina-nome');
    const professorNomeInput = document.getElementById('professor-nome');
    const logoutBtn = document.getElementById('logout-btn');

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

    const apiClient = axios.create({
        baseURL: '/api', 
        headers: { 'Authorization': `Bearer ${token}` }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });

    try {
        const response = await apiClient.get(`/disciplinas/${disciplinaId}`);
        const disciplina = response.data;
        disciplinaNomeInput.value = disciplina.nome;
        professorNomeInput.value = disciplina.professor;
    } catch (error) {
        console.error('Erro ao buscar dados da disciplina:', error);
        alert('Não foi possível carregar os dados da disciplina.');
        window.location.href = 'disciplinas.html';
    }

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const dadosAtualizados = {
            nome: disciplinaNomeInput.value,
            professor: professorNomeInput.value
        };

        if (!dadosAtualizados.nome.trim()) {
            return alert('O nome da disciplina é obrigatório.');
        }

        try {
            await apiClient.put(`/disciplinas/${disciplinaId}`, dadosAtualizados);
            alert('Disciplina atualizada com sucesso!');
            window.location.href = 'disciplinas.html';
        } catch (error) {
            console.error('Erro ao atualizar disciplina:', error);
            alert('Não foi possível salvar as alterações.');
        }
    });
});