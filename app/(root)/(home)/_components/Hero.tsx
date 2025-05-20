'use client'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { TextAnimate } from '@/components/magicui/text-animate'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

function Hero() {
	const router = useRouter()
	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='text-center mt-16'
		>
			<h1 className='text-5xl max-md:text-2xl font-bold'>
				Создавайте квизы, проходите тесты, делитесь с друзьями
			</h1>
			<TextAnimate
				animation='slideLeft'
				by='word'
				className='mt-6 text-2xl max-md:text-xl text-gray-600 dark:text-gray-300 text-center'
			>
				Проверь себя и брось вызов друзьям с лёгкостью!
			</TextAnimate>
			<div className='flex gap-4 items-center justify-center'>
				<InteractiveHoverButton
					className='mt-8 px-8 py-4 max-md:px-4 max-md:py-3 max-md:text-base font-semibold text-foreground text-lg rounded-xl transition cursor-pointer border-1 border-foreground'
					onClick={() => router.push('/create')}
				>
					Создать квиз
				</InteractiveHoverButton>
				<motion.button
					onClick={() => router.push('/quizzes')}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='mt-8 px-8 py-4 max-md:px-4 max-md:py-[14px]  max-md:text-base bg-primary font-semibold text-white text-lg rounded-xl transition cursor-pointer'
				>
					Начать квиз
				</motion.button>
			</div>
		</motion.section>
	)
}

export default Hero
