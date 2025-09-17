<template>
  <div class="row items-center justify-evenly bg-grey-2 full-height">
    <q-card class="column q-pa-md login-card shadow-4">
      <q-header class="row items-center q-pb-md" style="background: none">
        <q-img
          src="assets/imagelogo.png"
          alt="Logotipo do Sistema de Apoio a Alunos"
          class="logo-img"
        />
        <q-space />
        <span class="text-subtitle2 q-pr-sm text-grey-6"> Não tem conta ainda? </span>
        <router-link to="/signup" class="text-primary text-weight-bold"> Clique aqui </router-link>
      </q-header>

      <q-card-section>
        <h1 class="text-h4 text-weight-bold text-center q-my-md">Login</h1>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            v-model="email"
            label="Usuário ou email"
            type="email"
            filled
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, digite seu email']"
          />
          <q-input
            v-model="password"
            label="Senha"
            type="password"
            filled
            lazy-rules
            :rules="[(val) => (val && val.length >= 8) || 'A senha deve ter 8 ou mais caracteres']"
          />
          <div class="row items-center justify-between">
            <q-checkbox v-model="rememberMe" label="Lembre-se de mim" />
            <a href="#" class="text-primary">Esqueceu a senha?</a>
          </div>
          <q-btn
            type="submit"
            label="Entrar"
            color="primary"
            class="full-width q-mt-md"
            size="lg"
            :loading="loading"
          />
        </q-form>

        <div class="q-my-md text-center">
          <p class="text-grey-6">Ou logue por estas opções:</p>
          <div class="row q-gutter-md justify-center">
            <q-btn
              round
              icon="mdi-google"
              @click="handleGoogleLogin"
              class="social-btn google-btn"
              color="white"
              text-color="red"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="illustration-section gt-sm column items-center justify-center">
      <q-img
        src="assets/image2.png"
        alt="Ilustração de estudantes e material escolar"
        class="illustration-img"
      />
      <blockquote class="text-white text-center q-mt-md">
        <p class="text-h6 text-weight-bold">
          "A mente que se abre a uma nova ideia, jamais voltará ao seu tamanho original."
        </p>
        <footer class="text-subtitle1 text-weight-light">- Albert Einstein</footer>
      </blockquote>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useQuasar } from 'quasar'
import { auth } from 'boot/firebase' // Importação correta

const $q = useQuasar()
const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (error) {
    console.error('Erro no login:', error.message)
    $q.notify({
      type: 'negative',
      message: 'Email ou senha inválidos. Tente novamente.',
    })
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    router.push('/')
  } catch (error) {
    console.error('Erro no login com Google:', error.message)
    $q.notify({
      type: 'negative',
      message: 'Não foi possível fazer o login com o Google.',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
}
.logo-img {
  max-width: 150px;
}
.illustration-section {
  width: 100%;
  max-width: 500px;
  background: #3a8dff;
  border-radius: 8px;
  height: 100vh;
  padding: 32px;
}
@media (min-width: 1024px) {
  .login-card {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px;
  }
}
</style>
