'use client'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { auth, db } from '@/firebase'
import { registerSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false)

	const { setAuth } = useAuthState()
	// const navigate = useNavigate()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', passowrd: '' },
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, passowrd } = values
		setIsLoading(true)
		try {
			const res = await createUserWithEmailAndPassword(auth, email, passowrd)
			const user = res.user

			// Создание документа в userStats
			const statsRef = doc(db, 'userStats', user.uid)
			await setDoc(statsRef, {
				totalQuizzesPassed: 0,
				totalCorrectAnswers: 0,
				totalIncorrectAnswers: 0,
			})

			// navigate('/')
		} catch (ERROR) {
			const result = ERROR as Error
			console.log(result.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col'>
			{isLoading && <FillLoading />}
			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground'>
				Already have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Sign in
				</span>
			</p>
			<Separator className='my-3' />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-2'>
						<FormField
							control={form.control}
							name='passowrd'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='*****'
											type='password'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											placeholder='*****'
											type='password'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<Button
							type='submit'
							className='h-12 w-full mt-2'
							disabled={isLoading}
						>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default SignUpForm
