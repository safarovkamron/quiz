import { ReactNode } from 'react'

export interface IChildProps {
	children: ReactNode
}

export interface IAnswer{
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

