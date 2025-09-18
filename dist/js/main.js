import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const app = initializeApp(window.firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleLoginBtn = document.getElementById('google-login-btn');

const handleSuccessfulLogin = async (user) => {
    try {
        const idToken = await user.getIdToken();
        localStorage.setItem('authToken', idToken);

        const apiClient = axios.create({
            baseURL: '/api', 
            headers: { 'Authorization': `Bearer ${idToken}` }});


        await apiClient.post('/users/sync');


        window.location.href = 'home.html';
    } catch (error) {
        console.error("Erro durante o processo pós-login:", error);
        alert("Login bem-sucedido, mas houve um erro ao sincronizar seu perfil.");
    }
};

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await handleSuccessfulLogin(userCredential.user);
    } catch (error) {
        console.error("Erro no login com email:", error);
        alert("Falha no login. Verifique seu email e senha.");
    }
});

googleLoginBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        await handleSuccessfulLogin(result.user);
    } catch (error) {
        console.error("Erro no login com Google:", error);
        alert("Não foi possível fazer o login com o Google.");
    }
});