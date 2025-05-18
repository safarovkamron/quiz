'use client'
import { auth } from '@/firebase'
import { loginSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FillLoading from '../shared/fill-loading'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const { setAuth } = useAuthState()
	const router = useRouter()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', passowrd: '' },
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, passowrd } = values
		setIsLoading(true)
		try {
			const res = await signInWithEmailAndPassword(auth, email, passowrd)
			console.log(res)
			router.refresh()
		} catch (ERROR) {
			const result = ERROR as Error
			setError(result.message)
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col'>
			{isLoading && <FillLoading />}
			<h2 className='text-xl font-bold'>Login</h2>
			<p className='text-muted-foreground'>
				{"Don't have an account? "}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('register')}
				>
					Sign up
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

export default SignInForm
