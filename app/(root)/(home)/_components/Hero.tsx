'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

function Hero() {
	const router = useRouter()
	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className='text-center mt-16'
		>
			<h1 className='text-5xl max-md:text-2xl font-bold'>
				Создавайте квизы, проходите тесты, делитесь с друзьями
			</h1>
			<p className='mt-6 text-xl max-md:text-lg text-gray-600 dark:text-gray-300'>
				Проверь себя и брось вызов друзьям с лёгкостью!
			</p>
			<div className='flex gap-4 items-center justify-center'>
				<motion.button
					onClick={() => router.push('/create')}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='mt-8 px-8 py-4 max-md:px-3 max-md:py-2 max-md:text-sm font-semibold text-foreground text-lg rounded-xl transition cursor-pointer border-1 border-foreground'
				>
					Создать квиз
				</motion.button>
				<motion.button
					onClick={() => router.push('/quizzes')}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='mt-8 px-8 py-4 max-md:px-3 max-md:py-2 max-md:text-sm bg-primary font-semibold text-white text-lg rounded-xl transition cursor-pointer'
				>
					Начать квиз
				</motion.button>
			</div>
		</motion.section>
	)
}

export default Hero
