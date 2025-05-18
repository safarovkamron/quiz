'use client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { IAnswer, IQuestion } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {motion} from 'framer-motion'

interface IProps {
	questions: IQuestion[]
}

function QuizClient({ questions }: IProps) {
	const [timer, setTimer] = useState(30)
	const [countTrueAnswers, setcountTrueAnswers] = useState(0)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [currentAnswer, setCurrentAnswer] = useState<IAnswer | null>(null)
	const [isFinished, setIsFinished] = useState(false)
	const [isLastQuestion, setIsLastQuestion] = useState(false)
	const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(
		questions[0]
	)

	const finishTest = () => {
		setIsFinished(true)
		console.log('count', countTrueAnswers)
	}

	const checkAnswer = (answer: IAnswer | null) => {
		if (answer && answer.isTrue) {
			toast.success('Поздравляю вы ответили правильно!')
			setcountTrueAnswers(prev => prev + 1)
		} else {
			toast.error('Вы ответили неправильно!')
		}

		if (currentIndex === questions.length - 2) {
			setIsLastQuestion(true)
			if(currentIndex==questions.length-1) setIsFinished(true)
		}

		if (!isFinished) return setCurrentIndex(prev => prev + 1)
	}

	useEffect(() => {
		if (isFinished) return

		const interval = setInterval(() => {
			setTimer(prev => prev - 1)
		}, 1000)

		setCurrentQuestion(questions[currentIndex])

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (timer === 0 && !isFinished) {
			toast.error('Время вышло!')

			if (currentIndex !== questions.length - 1) {
				setCurrentIndex(prev => prev + 1)
			} else {
				setIsFinished(true)
			}
		}
	}, [timer])

	useEffect(() => {
		setTimer(30)
		setCurrentQuestion(questions[currentIndex])
	}, [currentIndex])

	const handleAnswerChange = (value: string) => {
		const selectedIndex = parseInt(value.replace('option-', ''), 10)
		const selected = currentQuestion!.answers[selectedIndex]
		if (selected) {
			setCurrentAnswer(selected)
		}
	}

	if (!isFinished) {
		return (
			<Card className='mt-10'>
				<CardHeader>
					<CardDescription className='text-center'>{`00:${(timer >= 10) ? timer : `0${timer}`}`}</CardDescription>
					<CardTitle>{currentQuestion!.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<RadioGroup onValueChange={handleAnswerChange}>
						{currentQuestion!.answers.map((a, id) => (
							<div className='flex items-center space-x-2' key={a.title}>
								<RadioGroupItem value={`option-${id}`} id={`option-${id}`} />
								<Label htmlFor={`option-${id}`}>{a.title}</Label>
							</div>
						))}
					</RadioGroup>
				</CardContent>
				<CardFooter>
					{!isLastQuestion ? (
						<Button onClick={() => checkAnswer(currentAnswer)}>Ответить</Button>
					) : (
						<Button
							onClick={() => {
								checkAnswer(currentAnswer)
								finishTest()
							}}
						>
							Закончить тест
						</Button>
					)}
				</CardFooter>
			</Card>
		)
	} else {
		return (
			<>
				<Card className='w-[500px] mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl text-center space-y-6'>
					<CardHeader>
						<CardTitle className='text-3xl font-bold text-zinc-800 dark:text-zinc-100'>
							🎉 Вы закончили тест!
						</CardTitle>
						<CardDescription className='text-lg text-zinc-600 dark:text-zinc-400'>
							Ознакомьтесь с вашими результатами ниже:
						</CardDescription>
					</CardHeader>
					<CardContent className='flex justify-around items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl py-4 px-6'>
						<div className='flex flex-col items-center'>
							<span className='text-green-500 text-4xl font-bold'>
								{countTrueAnswers}
							</span>
							<span className='text-sm text-zinc-600 dark:text-zinc-300 mt-1'>
								Правильные
							</span>
						</div>
						<div className='flex flex-col items-center'>
							<span className='text-red-500 text-4xl font-bold'>
								{questions.length - countTrueAnswers}
							</span>
							<span className='text-sm text-zinc-600 dark:text-zinc-300 mt-1'>
								Неправильные
							</span>
						</div>
					</CardContent>
					<CardFooter className='flex flex-col items-center'>
					<Link href="/quizzes">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-3 py-2 bg-primary font-semibold text-white text-lg rounded-xl transition cursor-pointer"
          >
            Начать квиз
          </motion.button>
        </Link>
					</CardFooter>
				</Card>
			</>
		)
	}
}

export default QuizClient
