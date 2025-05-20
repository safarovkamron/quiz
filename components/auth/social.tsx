'use client'
import { auth, db } from '@/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import FillLoading from '../shared/fill-loading'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const Social = () => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const onGoogle = () => {
	setIsLoading(true)
	const googleProvider = new GoogleAuthProvider()

	signInWithPopup(auth, googleProvider)
		.then(async res => {
			const user = res.user

			
			const statsRef = doc(db, 'userStats', user.uid)
			const statsSnap = await getDoc(statsRef)

			if (!statsSnap.exists()) {
				await setDoc(statsRef, {
					totalQuizzesPassed: 0,
					totalCorrectAnswers: 0,
					totalIncorrectAnswers: 0,
				})
			}

			router.refresh()
		})
		.catch(error => {
			console.error('Ошибка входа через Google:', error.message)
		})
		.finally(() => setIsLoading(false))
}

	return (
		<>
			{isLoading && <FillLoading />}
			<Separator className='my-2' />
			<div className='w-full'>
				<Button
					className='h-12 w-full'
					variant={'destructive'}
					disabled={isLoading}
					onClick={onGoogle}
				>
					<FaGoogle className='mr-2' />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
