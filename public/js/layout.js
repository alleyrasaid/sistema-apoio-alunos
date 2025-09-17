function getUserInfo() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { nome: payload.name, uid: payload.user_id };
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
}

function renderHeader(activePage) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const tarefasActive = activePage === 'tarefas' ? 'active' : '';
    const disciplinasActive = activePage === 'disciplinas' ? 'active' : '';

    const headerHTML = `
        <header class="main-header">
            <div class="logo">
                <img src="assets/imagelogo.png" alt="Logotipo">
            </div>
            <nav class="button-group">
                <a href="home.html" class="nav-btn ${tarefasActive}">Minhas Tarefas</a>
                <a href="disciplinas.html" class="nav-btn ${disciplinasActive}">Minhas Disciplinas</a>
                <a href="#" id="logout-btn-layout" class="nav-btn">Sair</a>
            </nav>
        </header>
    `;
    headerPlaceholder.innerHTML = headerHTML;

    const logoutBtn = document.getElementById('logout-btn-layout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        });
    }
}