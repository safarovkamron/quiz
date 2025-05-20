import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Metadata } from 'next'

async function Page({
	params,
}: {
	params: { userId: string }
}): Promise<Metadata> {
	const statsRef = doc(db, 'userStats', params.userId)
	const userRef = doc(db, 'users', params.userId)
	const [statsSnap, userSnap] = await Promise.all([
		getDoc(statsRef),
		getDoc(userRef),
	])

	const stats = statsSnap.exists() ? statsSnap.data() : null
	const user = userSnap.exists() ? userSnap.data() : null

	const title = `${user?.displayName || 'Пользователь'} — результаты квизов`
	const description = `✅ Квизов: ${
		stats?.totalQuizzesPassed || 0
	} | 🎯 Правильных: ${stats?.totalCorrectAnswers || 0} | ❌ Ошибок: ${
		stats?.totalIncorrectAnswers || 0
	}`
	const image = user?.photoURL || 'https://yourdomain.com/default-cover.png' // обязательно HTTPS

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
					width: 400,
					height: 400,
					alt: 'Avatar',
				},
			],
			url: `https://yourdomain.com/user-stats/${params.userId}`,
			siteName: 'QuizMaster',
			type: 'website',
		},
		twitter: {
			card: 'summary',
			title,
			description,
			images: [image],
		},
	}
}

export default Page
