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

type Props = {
	params: {
		id: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const quizId = params.id
	const ref = doc(db, 'quizzes', quizId)
	const snap = await getDoc(ref)
	const quiz = snap.exists() ? snap.data() : null

	const title = quiz?.title || 'Приглашение на квиз'
	const description = 'Пройди интересный квиз и проверь свои знания!'
	// const image = quiz?.coverImage || 'https://yourdomain.com/default-quiz-cover.png'

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			// images: [{ url: image, width: 800, height: 600 }],
			url: `https://yourdomain.com/share-quiz/${quizId}`,
			siteName: 'QuizMaster',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			// images: [image],
		},
	}
}

export default async function Page({ params }: Props) {
	const quizId = params.id

	return (
		<div className='flex justify-between items-center'>
			<AlertDialog open>
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
