'use client'
import BackButton from '@/components/shared/back-button'
import Filter from '@/components/shared/filter'
import Search from '@/components/shared/search'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import QuizCard from './_components/quiz-card'

import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

function Page() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [quizzes, setQuizzes] = useState<any[] | null>(null)

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'quizzes'))
				const data = querySnapshot.docs.map(doc => ({
					...doc.data(),
				}))
				setQuizzes(data)
				console.log(data)
			} catch (error) {
				console.error('Ошибка при получении вопросов:', error)
			}
		}

		fetchQuestions()
	}, [])

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
				{quizzes &&
					quizzes.map(t => (
						<QuizCard
							title={t.title}
							description={t.description}
							key={t.title}
							quizId={t.quizId}
						/>
					))}
			</motion.section>
		</div>
	)
}

export default Page
