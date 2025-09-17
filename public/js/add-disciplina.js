document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const addDisciplinaForm = document.getElementById('add-disciplina-form');
    const disciplinaNomeInput = document.getElementById('disciplina-nome');
    const professorNomeInput = document.getElementById('professor-nome');
    const logoutBtn = document.getElementById('logout-btn'); // Adicionado para logout

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        });
    }

    const apiClient = axios.create({
        baseURL: '/api', 
        headers: { 'Authorization': `Bearer ${token}` }
    });

    addDisciplinaForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = disciplinaNomeInput.value;
        const professor = professorNomeInput.value;

        if (!nome.trim()) {
            return alert('O nome da disciplina é obrigatório.');
        }

        const disciplinaData = {
            nome: nome,
            professor: professor
        };

        try {
            await apiClient.post('/disciplinas', disciplinaData);

            alert('Disciplina adicionada com sucesso!');
            
            window.location.href = 'disciplinas.html';

        } catch (error) {
            console.error('Erro ao adicionar disciplina:', error);
            if (error.response && error.response.data.message) {
                alert(`Erro: ${error.response.data.message}`);
            } else {
                alert('Não foi possível adicionar a disciplina. Tente novamente.');
            }
        }
    });
});