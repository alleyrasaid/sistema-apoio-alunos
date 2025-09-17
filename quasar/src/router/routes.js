const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tarefas',
        component: () => import('pages/TasksPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  // {
  //   path: '/signup',
  //   component: () => import('pages/SignupPage.vue'),
  // },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
