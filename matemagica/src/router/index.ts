import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import StudentView from '../views/Student/StudentView.vue';
import TeacherLayout from '../views/Teacher/TeacherLayout.vue';
import TeacherView from '../views/Teacher/TeacherView.vue';
import TeacherStudents from '../components/teacher/TeacherStudents.vue';
import TeacherClasses from '../components/teacher/TeacherClasses.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/cadastre-se',
            name: 'register',
            component: RegisterView
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
            name: 'teacher',
            component: TeacherLayout,
            children: [
                {
                    path: '',
                    name: 'teacherDashboard',
                    component: TeacherView,
                },
                {
                    path: '/alunos',
                    name: 'teacherStudents',
                    component: TeacherStudents,
                },
                                {
                    path: '/salas',
                    name: 'teacherClasses',
                    component: TeacherClasses,
                }
            ],
        },
    ]
})

export default router;