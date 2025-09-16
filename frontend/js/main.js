import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// 2. INICIALIZAÇÃO
const app = initializeApp(window.firebaseConfig);
const auth = getAuth(app);

// 3. SELETORES DE ELEMENTOS HTML
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleLoginBtn = document.getElementById('google-login-btn');

// 4. LÓGICA DE LOGIN COM EMAIL E SENHA
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('authToken', idToken);
        window.location.href = 'home.html';
    } catch (error) {
        console.error("Erro no login com email:", error);
        alert("Falha no login. Verifique seu email e senha.");
    }
});

// 5. LÓGICA DE LOGIN COM GOOGLE
googleLoginBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        localStorage.setItem('authToken', idToken);
        window.location.href = 'home.html';
    } catch (error) {
        console.error("Erro no login com Google:", error);
        alert("Não foi possível fazer o login com o Google.");
    }
});