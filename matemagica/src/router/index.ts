import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import StudentView from '../views/Student/StudentView.vue';
import TeacherLayout from '../views/Teacher/TeacherLayout.vue';
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
            component: TeacherLayout,
            children: [
                {
                path: '',
                name: 'professoresDashboard',
                component: TeacherView,
                }
            ],
        },
    ]
})

export default router;