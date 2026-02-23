import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ExamView from './views/ExamView.vue'
import ResultsView from './views/ResultsView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',        name: 'home',    component: HomeView },
    { path: '/exam',    name: 'exam',    component: ExamView },
    { path: '/results', name: 'results', component: ResultsView },
  ],
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
