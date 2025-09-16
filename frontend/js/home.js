document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const userGreeting = document.getElementById('user-greeting');
    const dashboardContent = document.getElementById('dashboard-content');

    // --- GUARDA DE AUTENTICAÇÃO ---
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Pega o nome do usuário do token e atualiza o H1
    const userInfo = getUserInfo();
    if (userInfo && userInfo.nome) {
        userGreeting.textContent = `Olá, ${userInfo.nome.split(' ')[0]}!`;
    }

    // --- CONFIGURAÇÃO DO AXIOS ---
    const apiClient = axios.create({
        baseURL: 'http://localhost:3000',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // --- FUNÇÃO PARA CARREGAR E RENDERIZAR A DASHBOARD ---
    try {
        // Busca todas as disciplinas e todas as tarefas em paralelo
        const [disciplinasResponse, tarefasResponse] = await Promise.all([
            apiClient.get('/disciplinas'),
            apiClient.get('/tarefas')
        ]);

        const disciplinas = disciplinasResponse.data;
        const tarefas = tarefasResponse.data;

        // Cria um "mapa" para encontrar o nome da disciplina pelo ID facilmente
        const disciplinaMap = new Map(disciplinas.map(d => [d.id, d.nome]));

        const tarefasPendentes = tarefas.filter(t => !t.concluida);

        // Limpa o conteúdo de "Carregando..."
        dashboardContent.innerHTML = '';

        if (tarefasPendentes.length === 0) {
            dashboardContent.innerHTML = '<div class="alert-box"><p>Você está em dia! Nenhuma tarefa pendente. 🎉</p></div>';
        } else {
            const titulo = document.createElement('h2');
            titulo.className = 'dashboard-title';
            titulo.textContent = 'Suas Próximas Tarefas';
            dashboardContent.appendChild(titulo);

            tarefasPendentes.forEach(tarefa => {
                const dataEntrega = tarefa.dataEntrega
                    ? new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR')
                    : 'Sem prazo';
                
                const nomeDisciplina = disciplinaMap.get(tarefa.disciplinaId) || 'Disciplina desconhecida';
                
                const tarefaElement = document.createElement('div');
                tarefaElement.className = 'tarefa-item';
                tarefaElement.innerHTML = `
                    <div class="tarefa-info">
                        <strong>${tarefa.descricao}</strong>
                        <span>${nomeDisciplina}</span>
                    </div>
                    <div class="tarefa-prazo">
                        <span>Entrega: ${dataEntrega}</span>
                    </div>
                `;
                dashboardContent.appendChild(tarefaElement);
            });
        }

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        dashboardContent.innerHTML = '<div class="alert-box"><p>Não foi possível carregar suas tarefas.</p></div>';
    }
});