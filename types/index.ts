import { ReactNode } from 'react'

export interface IChildProps {
	children: ReactNode
}

export interface IAnswer {
	title: string
	isTrue: boolean
}

export interface IQuiz {
	title: string
	description?: string
	quizId: string
	userId: string
}

export interface IQuestion {
	title: string
	quizId: string
	answers: IAnswer[]
}

export interface IQuizStore {
	quizzes: IQuiz[]
	setQuizzes: (data: IQuiz[]) => void
	filteredQuizzes: IQuiz[]
	setFilteredQuizzes: (data: IQuiz[]) => void
	resetFiltered: () => void
}

export interface IUserStats {
	totalQuizzesPassed: number
	totalCorrectAnswers: number
	totalIncorrectAnswers: number
}
