export interface ITeacherDashboard {
    "statistics": {
        average_score: number,
        completed_tasks: string,
        pending_tasks: string,
        total_classrooms: string,
        total_students: string,
        total_tasks: string

    },
    "studentPerformance": [
        {
            average_score: number,
            classroom_name: string,
            student_id: number,
            tasks_completed: string,
            total_tasks_assigned: string,
            username: string
        }
    ]
}

