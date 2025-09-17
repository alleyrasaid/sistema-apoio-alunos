<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Sistema de Apoio a Alunos </q-toolbar-title>
        <q-space />
        <div>
          <q-btn flat label="Dashboard" to="/" class="q-mr-sm" />
          <q-btn flat label="Minhas Tarefas" to="/tarefas" class="q-mr-sm" />
          <q-btn flat label="Sair" @click="handleLogout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu Principal </q-item-label>
        <q-item v-for="link in essentialLinks" :key="link.title" clickable :to="link.link" exact>
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const leftDrawerOpen = ref(false)
const router = useRouter()

const essentialLinks = [
  { title: 'Dashboard', icon: 'dashboard', link: '/' },
  { title: 'Minhas Tarefas', icon: 'task_alt', link: '/tarefas' },
]

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleLogout = async () => {
  const auth = getAuth()
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>
