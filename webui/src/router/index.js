// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProjectList from '@/views/ProjectList.vue'
import ProjectDetails from '@/views/ProjectDetails.vue'
import TaskList from '@/views/TaskList.vue'
import UserProfile from '@/views/UserProfile.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: ProjectList
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetails',
    component: ProjectDetails
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router