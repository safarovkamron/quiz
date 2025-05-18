import {z} from 'zod'

export const quizSchema = z.object({
	title: z.string().min(4),
	description: z.string()
})

export const answerSchema = z.object({
	title: z.string().min(1),
	isTrue: z.boolean()
})

export const questionSchema = z.object({
	title: z.string().min(4),
	answers:	z.array(answerSchema).min(2)
})

export const loginSchema = z.object({
	email: z.string().email(),
	passowrd: z.string().min(8),
})

export const registerSchema = z
	.object({
		email: z.string().email(),
		passowrd: z.string().min(8),
		confirmPassword: z.string(),
	})
	.refine(data => data.passowrd === data.confirmPassword, {
		message: 'Password do not match',
		path: ['confirmPassword'],
	})