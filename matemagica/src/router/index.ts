import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import StudentView from '../views/Student/StudentView.vue';
import TeacherView from '../views/Teacher/TeacherView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/alunos',
            name: 'alunos',
            component: StudentView,
            // children: [
            //     {
            //         path: '',
            //         name: 'StudentDashboard',
            //         component: StudentDashboard,
            //     }
            // ],
        },
        {
            path: '/professores',
            name: 'professores',
            component: TeacherView,
            // children: [
            //     {
            //     path: '', // Rota padrão, acessada em /professores
            //     name: 'TeacherDashboard',
            //     component: TeacherDashboard,
            //     }
            // ],
        },
    ]
})

export default router;