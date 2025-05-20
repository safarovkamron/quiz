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
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
	const quizId = params.id
	const ref = doc(db, 'quizzes', quizId)
	const snap = await getDoc(ref)
	const quiz = snap.exists() ? snap.data() : null

	const title = quiz?.title || 'Приглашение на квиз'
	const description = 'Пройди интересный квиз и проверь свои знания!'
	const image = 'https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg'

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [{ url: image, width: 500, height: 500 }],
			url: `https://quiz-pi-teal.vercel.app/share-quiz/${quizId}`,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
	const quizId = params.id

	return (
		<div className='flex justify-between items-center'>
			<AlertDialog open>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Вы готовы начинать?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							<Link href={`/`}>Нет</Link>
						</AlertDialogCancel>
						<AlertDialogAction>
							<Link href={`/quizzes/${quizId}`}>Да</Link>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
