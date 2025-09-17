document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const listaDisciplinasTbody = document.getElementById('lista-disciplinas-tbody');
    const alertsContainer = document.getElementById('alerts-container');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const apiClient = axios.create({
        baseURL: '/api', 
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const carregarDisciplinas = async () => {
        try {
            const response = await apiClient.get('/disciplinas');
            const disciplinas = response.data;

            listaDisciplinasTbody.innerHTML = ''; // Limpa a tabela

            if (disciplinas.length === 0) {
                alertsContainer.style.display = 'flex'; // Mostra o alerta
            } else {
                alertsContainer.style.display = 'none'; // Esconde o alerta
                disciplinas.forEach(disciplina => {
                    const tr = document.createElement('tr');
                    
                    // Cria a linha da tabela com as classes e estrutura do seu CSS
                    tr.innerHTML = `
                        <td>
                            <div class="professor-cell">
                                <span class="subject-icon"><i class="fas fa-book"></i></span>
                                <strong>${disciplina.nome}</strong>
                            </div>
                        </td>
                        <td>${disciplina.professor || 'Não informado'}</td>
                        <td>
                            <div class="task-actions">
                                <a href="tarefas.html?id=${disciplina.id}" class="icon-btn" title="Ver Tarefas">
                                    <i class="fas fa-tasks"></i>
                                </a>
                                <a href="editar-disciplina.html?id=${disciplina.id}" class="icon-btn" title="Editar">
                                    <i class="fas fa-pencil-alt"></i>
                                </a>
                                <button class="icon-btn btn-delete" data-id="${disciplina.id}" title="Excluir">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </td>
                    `;
                    listaDisciplinasTbody.appendChild(tr);
                });
            }
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
            if (error.response && error.response.status === 403) {
                localStorage.removeItem('authToken');
                window.location.href = 'index.html';
            }
        }
    };

    listaDisciplinasTbody.addEventListener('click', async (event) => {
        const deleteButton = event.target.closest('.btn-delete');

        if (deleteButton) {
            const disciplinaId = deleteButton.dataset.id;
            const confirmar = confirm("Tem certeza que deseja excluir esta disciplina?");

            if (confirmar) {
                try {
                    await apiClient.delete(`/disciplinas/${disciplinaId}`);
                    carregarDisciplinas();
                } catch (error) {
                    console.error("Erro ao excluir disciplina:", error);
                    alert("Não foi possível excluir a disciplina.");
                }
            }
        }
    });

    carregarDisciplinas();
});