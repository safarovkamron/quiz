'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/firebase'
import { questionSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection } from 'firebase/firestore'
import { Send, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface IProps {
	quizId: string
}

function QuestionsForm({ quizId }: IProps) {
	const [isLoading, setIsLoading] = useState(false)

	const route = useRouter()
	const [correctIndex, setCorrectIndex] = useState<number>(0)
	const form = useForm<z.infer<typeof questionSchema>>({
		resolver: zodResolver(questionSchema),
		defaultValues: {
			title: '',
			answers: [
				{ title: '', isTrue: false },
				{ title: '', isTrue: false },
			],
		},
	})

	const { control, register, handleSubmit } = form
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'answers',
	})

	const onSubmit = async (data: z.infer<typeof questionSchema>) => {
		try {
			setIsLoading(true)
			const updatedAnswers = data.answers.map((a, i) => ({
				...a,
				isTrue: i == correctIndex,
			}))

			const promise = addDoc(collection(db, 'questions'), {
				title: data.title,
				answers: updatedAnswers,
				quizId,
			})

			await toast.promise(promise, {
				loading: 'Loading...',
				success: 'Успешно добавлено!',
			})

			setTimeout(() => {
				form.reset()
				setCorrectIndex(0)
			}, 500)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder='Введите текст вопроса...'
									disabled={isLoading}
									className='h-10 resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-4'>
					{fields.map((field, index) => (
						<div key={field.id} className='flex items-center gap-4'>
							<input
								type='radio'
								name='correct'
								checked={correctIndex === index}
								onChange={() => setCorrectIndex(index)}
							/>
							<input
								{...register(`answers.${index}.title` as const)}
								placeholder={`Ответ ${index + 1}`}
								className='flex-1 border px-3 py-2 rounded'
							/>
							{index > 1 && (
								<Button
									type='button'
									variant='destructive'
									onClick={() => remove(index)}
								>
									<Trash className='w-4 h-4' />
								</Button>
							)}
						</div>
					))}
					<Button
						type='button'
						onClick={() =>
							append({
								title: '',
								isTrue: false,
							})
						}
						variant='outline'
					>
						Добавить ответ
					</Button>
				</div>

				<div className='flex items-center justify-between'>
					<Button
						className='w-fit rounded-full cursor-pointer'
						size={'lg'}
						type='submit'
						disabled={isLoading}
					>
						<span>Далее</span>
						<Send className='ml-2 size-4' />
					</Button>

					<Button
						className='w-fit rounded-full cursor-pointer'
						size={'lg'}
						type='button'
						onClick={async () => {
							const isValid = await form.trigger()

							if (isValid) {
								const values = form.getValues()
								await onSubmit(values)
							}

							route.push('/')
						}}
						disabled={isLoading}
					>
						<span>Закончить</span>
						<Send className='ml-2 size-4' />
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default QuestionsForm
