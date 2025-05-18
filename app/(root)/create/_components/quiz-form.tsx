'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/firebase'
import { quizSchema } from '@/lib/validation'
import { useUserState } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection } from 'firebase/firestore'
import { Send } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { uid } from 'uid'
import { z } from 'zod'

interface IProps {
	setCurrent: Dispatch<SetStateAction<number>>
	setQuizId: Dispatch<SetStateAction<string>>
	quizId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QuizForm({ setCurrent, setQuizId, quizId }: IProps) {
	const { user } = useUserState()
	const form = useForm<z.infer<typeof quizSchema>>({
		resolver: zodResolver(quizSchema),
		defaultValues: { title: '', description: '' },
	})

	const onSubmit = async (values: z.infer<typeof quizSchema>) => {
		setQuizId(uid())
		const promise = addDoc(collection(db, 'quizzes'), {
			title: values.title,
			description: values.description,
			userId: user!.uid,
			quizId: "1",
		})
		toast.promise(promise, {
					loading: "Loading...",
					success: "Успешно добавлено!"
				})
		setCurrent(prev => prev + 1)
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									// disabled={isLoading}
									className='h-10 resize-none'
									placeholder={'Напишите название квиза...'}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder={'Опишите квиза...'}
									// disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-fit rounded-full'
					size={'lg'}
					type='submit'
					// disabled={isLoading}
				>
					<span>Next</span>
					<Send className='ml-2 size-4' />
				</Button>
			</form>
		</Form>
	)
}

export default QuizForm
