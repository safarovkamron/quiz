'use client'
import { MagicCard } from '@/components/magicui/magic-card'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { TextAnimate } from '@/components/magicui/text-animate'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'

import { useUserState } from '@/stores/user.store'
import { doc, getDoc } from 'firebase/firestore'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaTelegram } from 'react-icons/fa6'

function Page() {
	const user = useUserState().user
	const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(`https://quiz-app.vercel.app/user-stats/${user?.uid}`)}&text=${encodeURIComponent('Смотри мой результат! Попробуй и ты пройти квизы!')}`
	const { theme } = useTheme()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [stats, setStats] = useState<any>({
		totalQuizzesPassed: 0,
		totalCorrectAnswers: 0,
		totalIncorrectAnswers: 0,
	})

	const getStats = async () => {
		try {
			const statsRef = doc(db, 'userStats', user!.uid)
			const statsSnap = await getDoc(statsRef)

			if (statsSnap.exists()) {
				const userStats = statsSnap.data()
				console.log('User stats:', stats)
				setStats(userStats)
			} else {
				console.log('Статистика не найдена.')
				return null
			}
		} catch (error) {
			console.error('Ошибка при получении статистики:', error)
			return null
		}
	}

	useEffect(() => {
		getStats()
	}, [user])

	return (
		<section className='flex flex-col gap-4 w-full h-full items-center justify-center'>
			<Card className='p-0 max-w-sm  w-full shadow-none border-none'>
				<MagicCard
					gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
					className='p-0'
				>
					<CardHeader className='border-b border-border p-4 [.border-b]:pb-4 text-center'>
						<CardTitle>Профиль</CardTitle>
						<CardDescription>
							Добро пожаловать {user?.displayName}!
						</CardDescription>
					</CardHeader>
					<CardContent className='p-4'>
						<div className='flex justify-center '>
							<Image
								src={user!.photoURL!}
								alt={user!.displayName!}
								width={80}
								height={80}
								className='rounded-full hover:opacity-85 transition-opacity'
							/>
						</div>
						<div className='flex items-center justify-center flex-col gap-2 mb-4'>
							<h3 className='text-xl font-medium'>{user?.displayName}</h3>
							<p className='text-white/40'>{user?.email}</p>
						</div>
						<Separator />
						<div className='flex flex-col gap-4'>
							<TextAnimate
								animation='blurInUp'
								by='character'
								once
								className='text-center mt-2 text-lg font-bold'
							>
								Знакомитесь с вашими результатами!
							</TextAnimate>
							<Separator />
							<div
								className='flex items-center justify-between max-md:flex-wrap
							'
							>
								<div className='text-center flex flex-col gap-2'>
									<NumberTicker
										value={stats.totalQuizzesPassed}
										className='whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white text-center'
									/>
									<p className='text-center'>Пройденные тесты.</p>
								</div>
								<div className='text-center flex flex-col gap-2'>
									<NumberTicker
										value={stats.totalCorrectAnswers}
										className='whitespace-pre-wrap text-4xl font-medium tracking-tighter text-green-500 dark:text-green-500 text-center'
									/>
									<p className='text-center text-green-500'>
										Правильные ответы.
									</p>
								</div>
								<div className='text-center flex flex-col gap-2'>
									<NumberTicker
										value={stats.totalIncorrectAnswers}
										className='whitespace-pre-wrap text-4xl font-medium tracking-tighter text-red-600 dark:text-red-600 text-center'
									/>
									<p className='text-center text-red-500'>
										Неправильные ответы.
									</p>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className='p-4 border-t border-border [.border-t]:pt-4'>
						<a
							href={shareUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='w-full'
						>
							<Button className='w-full flex items-center gap-2 cursor-pointer'>
								<span>Поделиться в Telegram</span>
								<FaTelegram />
							</Button>
						</a>
					</CardFooter>
				</MagicCard>
			</Card>
		</section>
	)
}

export default Page
