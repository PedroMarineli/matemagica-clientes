import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import StudentView from '../views/Student/StudentView.vue';
import TeacherLayout from '../views/Teacher/TeacherLayout.vue';
import TeacherView from '../views/Teacher/TeacherView.vue';
import TeacherStudents from '../components/teacher/TeacherStudents.vue';
import TeacherClasses from '../components/teacher/TeacherClasses.vue';
import RegisterView from '../views/RegisterView.vue';
import StudentLayout from '../views/Student/StudentLayout.vue';
import InicialView from '../views/InicialView.vue';
import TeacherTasks from '../components/teacher/TeacherTasks.vue';
import RegisterTask from '../components/teacher/RegisterTask.vue';
import Task from '../components/student/Task.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'inicial',
            component: InicialView
        },
        {
            path: '/login',
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
            name: 'student',
            component: StudentLayout,
            children: [
                {
                    path: '/alunos',
                    name: 'studentDashboard',
                    component: StudentView,
                },
                {
                    path: '/alunos/tarefa/:id',
                    name: 'task',
                    component: Task,
                }
            ],
        },
        {
            path: '/professores',
            name: 'teacher',
            component: TeacherLayout,
            children: [
                {
                    path: '/professores',
                    name: 'teacherDashboard',
                    component: TeacherView,
                },
                {
                    path: '/professores/alunos',
                    name: 'teacherStudents',
                    component: TeacherStudents,
                },
                {
                    path: '/professores/salas',
                    name: 'teacherClasses',
                    component: TeacherClasses,
                },
                {
                    path: '/professores/tarefas',
                    name: 'teacherTasks',
                    component: TeacherTasks,
                },
                {
                    path: '/professores/adicionar-tarefa',
                    name: 'registerTask',
                    component: RegisterTask,
                }
            ],
        },
        // {
        //     path: '/:catchAll(.*)',
        //     name: 'not-found',
        //     component: NotFoundView
        // }
    ]
})

export default router;