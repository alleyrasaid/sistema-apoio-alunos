document.addEventListener('DOMContentLoaded', () => {
    // --- Validação do Formulário de Login ---
    const loginForm = document.querySelector('.login-section form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            const email = loginForm.querySelector('input[type="email"]');
            const password = loginForm.querySelector('input[type="password"]');
            let isValid = true;

            // Limpa erros antigos
            clearError(email);
            clearError(password);

            // Valida email
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido.');
                isValid = false;
            }

            // Valida senha
            if (password.value.trim() === '') {
                showError(password, 'Por favor, insira sua senha.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário se for inválido
            }
        });
    }

    // --- Validação do Formulário de Cadastro (Signup) ---
    const signupForm = document.querySelector('.signup-section form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            const email = signupForm.querySelector('input[type="email"]');
            const password = signupForm.querySelector('input[type="password"]');
            const confirmPassword = signupForm.querySelector('input[placeholder="Confirmar Senha"]');
            let isValid = true;

            clearError(email);
            clearError(password);
            clearError(confirmPassword);

            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido.');
                isValid = false;
            }

            if (password.value.length < 6) {
                showError(password, 'A senha deve ter pelo menos 6 caracteres.');
                isValid = false;
            }

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'As senhas não coincidem.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    // --- Validação do Formulário de Adicionar Tarefa ---
    const addTaskForm = document.querySelector('form[action="tarefas-pendente.html"]');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', (event) => {
            const taskName = addTaskForm.querySelector('input[type="text"]');
            let isValid = true;

            clearError(taskName);

            if (taskName.value.trim() === '') {
                showError(taskName, 'O nome da tarefa não pode estar vazio.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }
    
    // --- Validação do Formulário de Adicionar Disciplina ---
    const addDisciplinaForm = document.querySelector('form[action="disciplinas-lista.html"]');
    if (addDisciplinaForm) {
        addDisciplinaForm.addEventListener('submit', (event) => {
            const disciplinaName = addDisciplinaForm.querySelector('input[type="text"]');
            let isValid = true;

            clearError(disciplinaName);

            if (disciplinaName.value.trim() === '') {
                showError(disciplinaName, 'O nome da disciplina não pode estar vazio.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }


    // --- Funções Auxiliares ---
    function showError(inputElement, message) {
        const formField = inputElement.parentElement;
        const errorElement = formField.querySelector('.error-message');
        if (!errorElement) {
            const newErrorElement = document.createElement('div');
            newErrorElement.className = 'error-message';
            newErrorElement.textContent = message;
            formField.appendChild(newErrorElement);
        } else {
            errorElement.textContent = message;
        }
        inputElement.classList.add('input-error');
    }

    function clearError(inputElement) {
        const formField = inputElement.parentElement;
        const errorElement = formField.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        inputElement.classList.remove('input-error');
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
