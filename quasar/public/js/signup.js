const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');


signupForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const nome = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    if (!nome || !email || !password) {
        return alert("Por favor, preencha todos os campos.");
    }
    if (password.length < 8) {
        return alert("A senha precisa ter pelo menos 8 caracteres.");
    }
    if (password !== confirmPassword) {
        return alert("As senhas não coincidem.");
    }

    const userData = {
        nome: nome,
        email: email,
        password: password
    };

    try {
        const response = await axios.post('http://localhost:3000/users/signup', userData);


        alert("Conta criada com sucesso! Você será redirecionado para a página de login.");
        
        window.location.href = 'index.html';

    } catch (error) {

        console.error("Erro no cadastro:", error);
        
        if (error.response && error.response.data.message) {
            alert(`Erro no cadastro: ${error.response.data.message}`);
        } else {
            alert("Ocorreu um erro. Tente novamente.");
        }
    }
});