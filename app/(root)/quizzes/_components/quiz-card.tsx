'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { FaShareFromSquare } from 'react-icons/fa6'

interface IProps {
	title: string
	description: string
	quizId: string
}

function QuizCard({ title, description, quizId }: IProps) {
	const route = useRouter()
	const telegramUrl = `https://t.me/share/url?url=https://quiz-pi-teal.vercel.app/share-quiz/${quizId}`
	return (
		<div className='flex flex-col gap-4 border-1 relative border-[#2525] rounded-md px-4 py-2'>
			<div className='flex flex-col gap-2 flex-1'>
				<h3 className='text-2xl font-bold flex-1'>{title}</h3>
				<p className='line-clamp-3'>{description}</p>
			</div>
			<div className='flex justify-between items-center'>
				<AlertDialog>
					<AlertDialogTrigger className='py-1 px-3 border-1 rounded-md bg-primary text-white cursor-pointer hover:bg-primary/90'>
						Начать
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Вы готовы начинать?</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Нет</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => route.push(`quizzes/${quizId}`)}
							>
								Да
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<a href={telegramUrl!} target='_blank' rel='noopener noreferrer'>
					<FaShareFromSquare className='cursor-pointer' />
				</a>
			</div>
		</div>
	)
}

export default QuizCard
