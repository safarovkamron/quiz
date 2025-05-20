import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Metadata } from 'next'

// Функция для генерации метаданных
export async function generateMetadata({
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
	const image = user?.photoURL || 'https://yourdomain.com/default-cover.png'

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

// Компонент страницы — рендерит UI
export default async function Page({ params }: { params: { userId: string } }) {
	const statsRef = doc(db, 'userStats', params.userId)
	const userRef = doc(db, 'users', params.userId)
	const [statsSnap, userSnap] = await Promise.all([
		getDoc(statsRef),
		getDoc(userRef),
	])

	const stats = statsSnap.exists() ? statsSnap.data() : null
	const user = userSnap.exists() ? userSnap.data() : null

	return (
		<main>
			<h1>{user?.displayName || 'Пользователь'}</h1>
			<p>Пройдено квизов: {stats?.totalQuizzesPassed || 0}</p>
			<p>Правильных ответов: {stats?.totalCorrectAnswers || 0}</p>
			<p>Неправильных ответов: {stats?.totalIncorrectAnswers || 0}</p>
			{/* Можно добавить фото профиля */}
			{user?.photoURL && (
				<img src={user.photoURL} alt='User Avatar' width={100} height={100} />
			)}
		</main>
	)
}
