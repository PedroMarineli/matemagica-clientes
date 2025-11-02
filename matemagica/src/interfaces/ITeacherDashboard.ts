export interface ITeacherDashboard {
    "generalStats": {
        average_score: string,
        completed_tasks: string,
        pending_tasks: string,
        total_classrooms: string,
        total_students: string,
        total_tasks: string

    },
    "studentPerformance": [
        {
            average_score: string,
            completed_tasks: string,
            id: number,
            username: string
        }
    ],
    "tasktPerformance": [
        {
            average_score: string,
            completions: string,
            id: number,
            title: string,
            total_assigned: string
        }
    ]
}

