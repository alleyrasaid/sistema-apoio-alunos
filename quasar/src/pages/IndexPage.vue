<template>
  <q-page class="flex flex-center home-bg">
    <div class="main-content q-pa-md text-center">
      <h1 class="text-h4 text-weight-bold q-mb-md" v-if="userName">Olá, {{ userName }}!</h1>
      <q-spinner v-if="loading" color="primary" size="3em" :thickness="5" />

      <div v-else-if="tasks.length > 0">
        <p class="text-subtitle1 text-grey-7">Suas tarefas pendentes:</p>
        <q-list bordered separator class="rounded-borders q-mt-md">
          <q-item v-for="task in tasks" :key="task.id" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ task.title }}</q-item-label>
              <q-item-label caption>{{ task.description }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge :color="task.completed ? 'green' : 'red'">
                {{ task.completed ? 'Concluída' : 'Pendente' }}
              </q-badge>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else>
        <p class="text-subtitle1 text-grey-7">Você não tem tarefas no momento. 🎉</p>
      </div>
    </div>
    <q-img
      src="assets/image5.png"
      alt="Ilustração de um estudante"
      class="home-illustration gt-sm"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'

const userName = ref('')
const tasks = ref([])
const loading = ref(true)

const fetchDashboardData = async () => {
  const auth = getAuth()
  const user = auth.currentUser
  if (user) {
    userName.value = user.displayName || user.email
  }
  try {
    const tasksResponse = [
      {
        id: 1,
        title: 'Revisar matéria de matemática',
        description: 'Capítulo 5 e 6 do livro.',
        completed: false,
      },
      {
        id: 2,
        title: 'Fazer o trabalho de física',
        description: 'Entrega na próxima semana.',
        completed: true,
      },
    ]
    tasks.value = tasksResponse
  } catch (error) {
    console.error('Erro ao carregar os dados do dashboard:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<style scoped>
.home-bg {
  background-color: #f0f2f5;
  min-height: 100vh;
}
.main-content {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 40px;
  max-width: 600px;
  width: 100%;
}
.home-illustration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
}
@media (max-width: 1023px) {
  .home-illustration {
    display: none;
  }
}
</style>
