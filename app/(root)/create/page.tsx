'use client'
import BackButton from '@/components/shared/back-button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { uid } from 'uid'
import QuestionsForm from './_components/questions-form'
import QuizForm from './_components/quiz-form'

function Page() {
	const [current, setCurrent] = useState(1)
	const [quizId, setQuizId] = useState('')

	useEffect(() => {
		setQuizId(uid())
	}, [])

	return (
		<>
			<div className='px-20 py-4'></div>
			<section className=''>
				<div className='rounded-md bg-background p-4 h-full'>
					<div className='flex gap-2 items-start '>
						<BackButton />
						<div className='flex flex-col justify-end'>
							<h1 className='font-space-grotesk text-xl font-bold'>
								Создание квиза
							</h1>
							<p className='font-light'>
								Сделай тест, который захочется пройти.
							</p>
						</div>
					</div>
					<Separator className='my-3' />
					{current == 1 ? (
						<QuizForm
							setCurrent={setCurrent}
							quizId={quizId}
							setQuizId={setQuizId}
						/>
					) : (
						<QuestionsForm quizId={quizId} />
					)}
				</div>
			</section>
		</>
	)
}

export default Page
