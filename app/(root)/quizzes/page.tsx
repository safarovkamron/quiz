'use client'
import BackButton from '@/components/shared/back-button'
import Filter from '@/components/shared/filter'
import Search from '@/components/shared/search'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import QuizCard from './_components/quiz-card'

import { db } from '@/firebase'
import { useQuizStore } from '@/stores/quiz.store'
import { IQuiz } from '@/types'
import { collection, getDocs } from 'firebase/firestore'

function Page() {
	const { quizzes, filteredQuizzes, setQuizzes } = useQuizStore()

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'quizzes'))
				const data = querySnapshot.docs.map(doc => {
					const quiz = doc.data()
					return {
						title: quiz.title,
						description: quiz.description,
						quizId: quiz.quizId,
						userId: quiz.userId,
					} as IQuiz
				})
				setQuizzes(data)
				console.log('quiz', data)
			} catch (error) {
				console.error('Ошибка при получении вопросов:', error)
			}
		}
		console.log(filteredQuizzes)
		fetchQuestions()
	}, [setQuizzes])

	return (
		<div className='flex flex-col gap-4 py-2'>
			<div className='flex justify-between items-center gap-4'>
				<BackButton />

				<div className='flex-1 w-full '>
					<Search />
				</div>
				<div>
					<Filter />
				</div>
			</div>
			<motion.section
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='grid grid-cols-4 gap-3'
			>
				{filteredQuizzes.length ? (
					filteredQuizzes.map(t => (
						<QuizCard
							title={t.title}
							description={t.description ? t.description : ''}
							key={t.title}
							quizId={t.quizId}
						/>
					))
				) : (
					<div className='w-full'>
						<h3 className='text-center w-full text-white/30 text-xl'>
							Квизы не найдены!
						</h3>
					</div>
				)}
				{!quizzes && (
					<div className='w-full'>
						<h3 className='text-center w-full text-white/30 text-xl'>
							Пока квизы нет!
						</h3>
					</div>
				)}
			</motion.section>
		</div>
	)
}

export default Page
