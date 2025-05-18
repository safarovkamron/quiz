import { IQuizStore } from '@/types'
import { create } from 'zustand'

export const useQuizStore = create<IQuizStore>()(set => ({
	quizzes: [],
	filteredQuizzes: [],
	setQuizzes: data => set({ quizzes: data, filteredQuizzes: data }),
	setFilteredQuizzes: data => set({ filteredQuizzes: data }),
	resetFiltered: () => set(state => ({ filteredQuizzes: state.quizzes })),
}))