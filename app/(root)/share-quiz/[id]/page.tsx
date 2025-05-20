import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const quizId = params.id
	const quizRef = doc(db, 'quizzes', quizId)
	const quizSnap = await getDoc(quizRef)
	const quiz = quizSnap.exists() ? quizSnap.data() : null

	const title = quiz?.title || 'Приглашение на квиз'
	const description = 'Пройди интересный квиз и проверь свои знания!'
	const image =
		quiz?.coverImage || 'https://yourdomain.com/default-quiz-cover.png'

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
					width: 800,
					height: 600,
					alt: 'Quiz Cover',
				},
			],
			url: `https://yourdomain.com/quiz-confirm/${quizId}`,
			siteName: 'QuizMaster',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const quizId = params.id

	// Можно получить сам квиз, если хочешь отобразить в диалоге, например
	// const quizRef = doc(db, 'quizzes', quizId)
	// const quizSnap = await getDoc(quizRef)
	// const quiz = quizSnap.exists() ? quizSnap.data() : null

	return (
		<div className='flex justify-between items-center'>
			<AlertDialog open={true}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Вы готовы начинать?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Нет</AlertDialogCancel>
						<AlertDialogAction>
							<Link href={`/quizzes/${quizId}`}>Да</Link>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
