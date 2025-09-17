<template>
  <q-page class="q-pa-md tasks-page-bg">
    <div class="q-gutter-md">
      <h1 class="text-h4 text-weight-bold q-mb-md">Minhas Tarefas</h1>

      <div class="table-container shadow-2">
        <div class="table-title bg-blue-grey-2 text-dark text-center q-pa-sm">Tarefas</div>
        <q-table
          :rows="tasks"
          :columns="columns"
          row-key="id"
          flat
          square
          hide-bottom
          :loading="loading"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="props.row.completed ? 'green' : 'red'">
                {{ props.row.completed ? 'Concluída' : 'Pendente' }}
              </q-badge>
            </q-td>
          </template>

          <template v-slot:body-cell-deadline="props">
            <q-td :props="props">
              {{ formatDate(props.row.deadline) }}
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                round
                flat
                :icon="props.row.completed ? 'check_box' : 'check_box_outline_blank'"
                :color="props.row.completed ? 'green' : 'grey'"
                @click="toggleTaskStatus(props.row)"
                class="q-mr-sm"
              >
                <q-tooltip>{{ props.row.completed ? 'Desmarcar' : 'Concluir' }}</q-tooltip>
              </q-btn>
              <q-btn dense round flat icon="delete" color="red" @click="deleteTask(props.row.id)">
                <q-tooltip>Excluir</q-tooltip>
              </q-btn>
            </q-td>
          </template>

          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
      </div>

      <q-btn
        label="+ Adicionar Nova Tarefa"
        color="primary"
        @click="showAddTaskDialog"
        class="btn-add-task q-mt-md"
      />
    </div>

    <q-dialog v-model="showDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Adicionar Nova Tarefa</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="newTask.description" label="Descrição da Tarefa" autofocus />
          <q-input v-model="newTask.deadline" type="date" label="Data de Entrega" class="q-mt-sm" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Adicionar" color="primary" @click="addTask" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-img src="assets/image11.png" alt="Ilustração" class="tasks-illustration gt-sm" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Variáveis reativas
const tasks = ref([])
const loading = ref(true)
const showDialog = ref(false)
const newTask = ref({
  id: null,
  description: '',
  deadline: '',
  completed: false,
})

// Colunas para a Q-Table
const columns = [
  { name: 'description', label: 'Descrição', field: 'description', align: 'left' },
  { name: 'status', label: 'Status', field: 'completed', align: 'center' },
  {
    name: 'deadline',
    label: 'Data de Entrega',
    field: 'deadline',
    align: 'center',
    sortable: true,
  },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

// Lógica de manipulação de dados
const fetchTasks = async () => {
  loading.value = true
  try {
    // Substitua esta lógica por uma chamada real à sua API ou Firebase
    const mockTasks = [
      {
        id: 1,
        description: 'Estudar para a prova de biologia',
        completed: false,
        deadline: '2025-10-10',
      },
      {
        id: 2,
        description: 'Entregar trabalho de história',
        completed: true,
        deadline: '2025-09-20',
      },
      {
        id: 3,
        description: 'Revisar conteúdo de matemática',
        completed: false,
        deadline: '2025-11-05',
      },
    ]
    tasks.value = mockTasks
  } catch (error) {
    console.error('Erro ao carregar as tarefas:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao carregar as tarefas.',
    })
  } finally {
    loading.value = false
  }
}

const toggleTaskStatus = (task) => {
  // Simulação de atualização de status
  task.completed = !task.completed
  $q.notify({
    type: 'positive',
    message: `Tarefa "${task.description}" ${task.completed ? 'concluída' : 'marcada como pendente'}.`,
  })
}

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
  $q.notify({
    type: 'info',
    message: 'Tarefa excluída com sucesso!',
  })
}

const addTask = () => {
  if (newTask.value.description.trim() === '') {
    $q.notify({
      type: 'negative',
      message: 'A descrição da tarefa não pode estar vazia.',
    })
    return
  }

  // Lógica de adição de nova tarefa (gerar ID e adicionar à lista)
  const newId = tasks.value.length > 0 ? Math.max(...tasks.value.map((t) => t.id)) + 1 : 1
  tasks.value.push({
    ...newTask.value,
    id: newId,
    completed: false,
  })

  $q.notify({
    type: 'positive',
    message: 'Tarefa adicionada com sucesso!',
  })

  // Resetar o formulário e fechar o diálogo
  newTask.value = { id: null, description: '', deadline: '', completed: false }
  showDialog.value = false
}

const showAddTaskDialog = () => {
  showDialog.value = true
}

// Formatação da data para exibição
const formatDate = (value) => {
  if (!value) return ''
  return date.formatDate(value, 'DD/MM/YYYY')
}

onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.tasks-page-bg {
  background-color: #f0f2f5;
  min-height: 100vh;
  position: relative;
}
.table-container {
  border-radius: 8px;
  overflow: hidden;
}
.table-title {
  font-weight: bold;
  font-size: 1.25rem;
}
.tasks-illustration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 250px;
}
@media (max-width: 1023px) {
  .tasks-illustration {
    display: none;
  }
}
</style>
