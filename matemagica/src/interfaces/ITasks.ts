export interface ITasks {
    id: number
    title: string
    type: string
    problems: IProblems[],
    difficulty: string,
    classroom_id: number,
    teacher_id: number,
    created_at: string
}

export interface IProblems {
    content: string,
    answer: number
}

export interface ITaskProgress {
    task_id: number
    title: string
    type: string
    problems: string
    difficulty: string
    status: 'Not Started' | 'In Progress' | 'Submitted' | 'Graded',
    score: number,
    completion_date: string,
    number_of_attempts: number
}

// export interface ITaskProgress {
//     id: number
//     student_id: number
//     task_id: number
//     status: 'Not Started' | 'In Progress' | 'Submitted' | 'Graded',
//     score: number,
//     completion_date: string,
//     created_at: string
// }

export interface IListProgressInATask {
    completion_date: string,
    email: string,
    score: number,
    status: 'Not Started' | 'In Progress' | 'Submitted' | 'Graded',
    student_id: number,
    username: string,
}